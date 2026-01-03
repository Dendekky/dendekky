---
title: "This condition will always return 'false' since the types X and Y have no overlap"
date: "2023-07-11"
summary: "Understanding and fixing TypeScript enum comparison errors with type coercion."
tags: ["typescript", "enums", "webdev"]
---

There are a few reasons why typescript will throw this error.

- Typescript enum limitations
- Messing up logical operators.
- Strictly comparing values of different types.

In the last two cases, you can review your code logic and fix it.

Working with enums, you might inadvertently create a situation where you run into this error. Let's take a look at the typing below.

```typescript
enum DashboardType {
  Shape = "Shape",
  SingleShape = "SingleShape",
  MultipleShapes = "MultipleShapes",
}
```

Now, we have a type of dashboard that could be a single shape or multiple shapes dashboard, or either of the two.
In the case where the dashboard is a Shape dashboard, let's assume you have a component that uses this check to render or handle some logic.

```typescript
if(dashboard === DashboardType.Shape)
```

In the logic, if you have a check like

```typescript
if(dashboard === DashboardType.Shape) {
    // some operations
    if(dashboard === DashboardType.SingleShape) {
       // some rendering/operation
    }
    if(dashboard === DashboardType.MultipleShapes) {
       // some rendering/operation
    }
}
```

then typescript will throw an error like this `This condition will always return 'false' since the types dashboard and DashboardType have no overlap`.

You can use type coercion to fix the error like this:

```typescript
(dashboard as DashboardType) === DashboardType.SingleShape
```

On the other hand, you can just improve your conditional logic and the enum type if you can afford to.
For example, the type DashboardType could become

```typescript
{
  SingleShape = "SingleShape",
  MultipleShapes = "MultipleShapes",
}
```

Then, to handle a shape component (regardless of whether it's single or multiple), you can have the logic like this:

```typescript
if(dashboard === DashboardType.SingleShape || dashboard === DashboardType.MultipleShapes)
```

Happy coding!
