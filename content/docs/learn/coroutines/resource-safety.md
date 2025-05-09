---
sidebar_position: 2
---

# Resource

<!--- TEST_NAME ResourceTest -->

Allocation and release of resources is not easy, especially when
we have multiple resources that depend on each other. The Resource DSL
adds the ability to _install_ resources and ensure proper finalization even
in the face of exceptions and cancellations. Arrow's Resource co-operate
with Structured Concurrency and KotlinX Coroutines.

:::info Media resources

- [_Graceful Resource Handling_](https://www.youtube.com/watch?v=zKrTBH8jqH4) by Simon Vergauwen
- [_Graceful Shutdown with Structured Concurrency_](https://kotlindevday.com/videos/grateful-shutdown-with-structured-concurrency-simon-vergauwen/) by Simon Vergauwen

:::

:::note Where to find it

Resource management is part of the `arrow-fx-coroutines` library. The separate `arrow-autoclose` library provides a similar API but without integration with Kotlin's coroutine mechanism.

:::

## Understanding the problem

The following program is **not** safe because it is prone to leak `dataSource` 
and `userProcessor` when an exception or cancellation signal occurs while using the service.

```kotlin
class UserProcessor {
  fun start(): Unit = println("Creating UserProcessor")
  fun shutdown(): Unit = println("Shutting down UserProcessor")
}

class DataSource {
  fun connect(): Unit = println("Connecting dataSource")
  fun close(): Unit = println("Closed dataSource")
}

class Service(val db: DataSource, val userProcessor: UserProcessor) {
  suspend fun processData(): List<String> = 
    throw RuntimeException("I'm going to leak resources by not closing them")
}
```

For example, the following application would leak resources.

```kotlin
suspend fun example() {
  val userProcessor = UserProcessor().also { it.start() }
  val dataSource = DataSource().also { it.connect() }
  val service = Service(dataSource, userProcessor)

  service.processData()

  dataSource.close()
  userProcessor.shutdown()
}
```
<!--- KNIT example-resource-01.kt -->

If we were using Kotlin JVM, we might rely on `Closeable` or `AutoCloseable` and rewrite our code like this.

<!--- INCLUDE
class UserProcessor : AutoCloseable {
  fun start(): Unit = println("Creating UserProcessor")
  override fun close(): Unit = println("Shutting down UserProcessor")
}

class DataSource : AutoCloseable{
  fun connect(): Unit = println("Connecting dataSource")
  override fun close(): Unit = println("Closed dataSource")
}

class Service(val db: DataSource, val userProcessor: UserProcessor) {
  suspend fun processData(): List<String> = 
    throw RuntimeException("I'm going to leak resources by not closing them")
}
-->
```kotlin
suspend fun example() {
  UserProcessor().use { userProcessor ->
    userProcessor.start()
    DataSource().use { dataSource ->
      dataSource.connect()
      Service(dataSource, userProcessor).processData()
    }
  }
}
```
<!--- KNIT example-resource-02.kt -->

However, while we fixed the closing of `UserProcessor` and `DataSource`, there are still issues with this code:

  1. It requires implementing `Closeable` or `AutoCloseable`, which is only possible for Kotlin JVM but not available for Multiplatform.
  2. Requires implementing an interface or wrapping external types with something like `class CloseableOf<A>(val type: A): Closeable`.
  3. Requires nesting of different resources in a callback tree, which is not composable.
  4. Enforces `close` method name, renamed `UserProcessor#shutdown` to `close`
  5. Cannot run `suspend` functions within `fun close(): Unit`.
  6. No exit signal; we don't know whether we exited successfully, with an error or cancellation.

`Resource` solves these issues. The main idea is that each resource has three
stages: 1️⃣ acquiring the resource, 2️⃣ using the resource, and 3️⃣ releasing the
resource. With `Resource`, we bundle steps (1) and (3), and the implementation
ensures that everything works correctly, even in the event of exceptions or
cancellations.

:::note Graceful Shutdowns

Correct release of resources when the application is terminating is important
in several scenarios.
[SuspendApp](../suspendapp/) improves on
`Resource` to gracefully deal with shutdown and termination.

:::

## Dealing with resources properly

You can use Arrow's Resource in two ways:

1. Using `resourceScope` and functions with `ResourceScope` as its receiver.
2. Wrapping the entire resource allocation and release as a `Resource<A>` value,
   which we later `use` in a larger block.

### Using `resourceScope`

The `ResourceScope` DSL allows you to _install_ resources and safely interact with them.
In fact, that's the only operation you need to learn about: `install` takes both
the acquisition and release steps as arguments. The result of this function is
whatever was acquired, plus the promise of running the finalizer at the end of
the block.

:::tip

The Resource DSL gives you enough flexibility to perform different actions
depending on how the execution finished: successful completion, exceptions, 
or cancellation. The second argument to the finalizer is of type `ExitCase`
and represents the reason why the finalizer is run.

:::

The code below shows our `example` rewritten to use `resourceScope`. Note that
we acquire our `UserProcessor` and `DataSource` in parallel, using the [`parZip`
operation in Arrow](../parallel). This means that their `start` and `connect` 
methods can run in parallel.

<!--- INCLUDE
import arrow.fx.coroutines.ResourceScope
import arrow.fx.coroutines.resourceScope
import arrow.fx.coroutines.parZip
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class UserProcessor {
  suspend fun start(): Unit = withContext(Dispatchers.IO) { println("Creating UserProcessor") }
  suspend fun shutdown(): Unit = withContext(Dispatchers.IO) {
    println("Shutting down UserProcessor")
  }
}

class DataSource {
  suspend fun connect(): Unit = withContext(Dispatchers.IO) { println("Connecting dataSource") }
  suspend fun close(): Unit = withContext(Dispatchers.IO) { println("Closed dataSource") }
}

class Service(val db: DataSource, val userProcessor: UserProcessor) {
  suspend fun processData(): List<String> = (0..10).map { "Processed : $it" }
}
-->
```kotlin
suspend fun ResourceScope.userProcessor(): UserProcessor =
  install({ UserProcessor().also { it.start() } }) { p, _ -> p.shutdown() }

suspend fun ResourceScope.dataSource(): DataSource =
  install({ DataSource().also { it.connect() } }) { ds, _ -> ds.close() }

suspend fun example(): Unit = resourceScope {
  val service = parZip({ userProcessor() }, { dataSource() }) { userProcessor, ds ->
    Service(ds, userProcessor)
  }
  val data = service.processData()
  println(data)
}
```
<!--- KNIT example-resource-03.kt -->

The code above also showcases a very common pattern of resource acquisition:
running the constructor, followed by calling some start method using Kotlin's
`also` scope function.

:::note

To achieve its behavior, `install` invokes the `acquire` and `release` steps
as [NonCancellable](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-non-cancellable/).
If a cancellation signal or an exception is received during `acquire`, the 
resource is assumed to **not** have been acquired and thus will not trigger the
release function; any composed resources that are already acquired are guaranteed 
to be released as expected.

:::

### Interfacing with Java

If you're running on the JVM, Arrow provides built-in integration with
[`AutoCloseable`](https://docs.oracle.com/javase/8/docs/api/java/lang/AutoCloseable.html)
in the form of the [`closeable`](https://apidocs.arrow-kt.io/arrow-fx-coroutines/arrow.fx.coroutines/closeable.html) function.

### Using `Resource`

The usage of `resource` is very similar to that of `install`. The main difference
is that the result is a value of type `Resource<T>`, where `T` is the type of
the resource to acquire. But such a value doesn't run the acquisition step,
it's simply a _recipe_ describing how that's done; to actually acquire the
resource, you need to call `.bind()` inside a `resourceScope`.

<!--- INCLUDE
import arrow.fx.coroutines.Resource
import arrow.fx.coroutines.resource
import arrow.fx.coroutines.resourceScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class UserProcessor {
  suspend fun start(): Unit = withContext(Dispatchers.IO) { println("Creating UserProcessor") }
  suspend fun shutdown(): Unit = withContext(Dispatchers.IO) {
    println("Shutting down UserProcessor")
  }
}

class DataSource {
  fun connect(): Unit = println("Connecting dataSource")
  fun close(): Unit = println("Closed dataSource")
}

class Service(val db: DataSource, val userProcessor: UserProcessor) {
  suspend fun processData(): List<String> = throw RuntimeException("I'm going to leak resources by not closing them")
}
-->
```kotlin
val userProcessor: Resource<UserProcessor> = resource({
  UserProcessor().also { it.start() }
}) { p, _ -> p.shutdown() }

val dataSource: Resource<DataSource> = resource({
  DataSource().also { it.connect() }
}) { ds, exitCase ->
  println("Releasing $ds with exit: $exitCase")
  withContext(Dispatchers.IO) { ds.close() }
}

val service: Resource<Service> = resource {
  Service(dataSource.bind(), userProcessor.bind())
}

suspend fun example(): Unit = resourceScope {
  val data = service.bind().processData()
  println(data)
}
```
<!--- KNIT example-resource-04.kt -->

:::info

_Why provide two ways to accomplish the same goal?_ 
Although `resourceScope` provides nicer syntax in general, some usage patterns
like acquiring several resources become easier when the steps are saved in
an actual class.

The actual magic is that `Resource` is nothing more than a type alias for
parameter-less function using `ResourceScope`,

<!--- INCLUDE
import arrow.fx.coroutines.ResourceScope
-->
```kotlin
typealias Resource<A> = suspend ResourceScope.() -> A
```
<!--- INCLUDE
suspend fun example() { }
-->
<!--- KNIT example-resource-05.kt -->

:::

Although the primary usage pattern is to give `resource` the acquisition and 
release steps directly, there's another way to define a `Resource<T>`.
Arrow provides a `resource` for more complex scenarios that takes a block
with `ResourceScope` as a receiver. That allows calling `install` as required.

<!--- INCLUDE
import arrow.fx.coroutines.Resource
import arrow.fx.coroutines.resource
import arrow.fx.coroutines.resourceScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class UserProcessor {
  suspend fun start(): Unit = withContext(Dispatchers.IO) { println("Creating UserProcessor") }
  suspend fun shutdown(): Unit = withContext(Dispatchers.IO) {
    println("Shutting down UserProcessor")
  }
}
-->
```kotlin
val userProcessor: Resource<UserProcessor> = resource {
  val x: UserProcessor = install(
    {  UserProcessor().also { it.start() } },
    { processor, _ -> processor.shutdown() }
  )
  x
}
```
<!--- KNIT example-resource-06.kt -->

## Integration with typed errors

Resource management cooperates with [typed error builders](../../typed-errors).
It's important to be aware that the order in which we open the scopes
affects the behavior. To be more concrete, let's consider the two possible
nestings of `resourceScope` and `either`.

1. When `either` is in the outermost position and `resourceScope` is inside of it,
   a bind that crosses the `resourceScope` results in the release finalizer 
   being called with `Cancelled`.

    ```kotlin
    either<String, Int> {
      resourceScope {
        val a = install({ }) { _, ex -> println("Closing A: $ex") }
        raise("Boom!")
      } // Closing A: ExitCase.Cancelled
    } // Either.Left(Boom!)
    ```

2. With reverse nesting order of `either` and `resourceScope`, then resources
   are released with a normal state since nothing "failed."

    ```kotlin
    resourceScope {
      either<String, Int> {
        val a = install({ }) { _,ex -> println("Closing A: $ex") }
        raise("Boom!")
      } // Either.Left(Boom!)
    } // Closing A: ExitCase.Completed
    ```

We remark that, in both cases, resources are correctly released. If your
finalizer works in the same way for every possible `ExitCase`, then there's no
visible difference between them. 

:::info

If you want to know more, this [conversation](https://kotlinlang.slack.com/archives/C5UPMM0A0/p1677093177834299)
in the Kotlin Slack goes into more detail.

:::
