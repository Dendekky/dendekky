---
title: "How To Remove Items From RJSF Custom ArrayTemplate"
date: "2024-11-20"
summary: "A quick guide on properly using onDropIndexClick in React JSON Schema Form custom array templates."
tags: ["react", "rjsf", "typescript"]
---

Using React JSON Schema Form can help save a lot of time and improve team collaboration.
However, there will be many instances when the default templates are not good enough. This is when custom templates can be used to replace the defaults that come with this library. However, some of these functions and methods are not all documented in their documentation.

Today we will look at removing items in an RJSF Custom Array Template.
Our custom template for an array will look like this:

```tsx
function ArrayFieldTemplate(props: ArrayFieldTemplateProps) {
  return (
    <>
      <Title>
        {props.title}
      </Title>
      {props.items.map((element) => (
        <Row key={element.key} justify="start" gutter={8}>
          <Col span={22}>{element.children}</Col>
          <Col span={2}>
            <CloseOutlined
              onClick={(event) => {
                element.onDropIndexClick(element.index)(event);
              }}
            />
          </Col>
        </Row>
      ))}
      {props.canAdd && (
        <Button type="primary" onClick={props.onAddClick} block>
          Add
        </Button>
      )}
    </>
  );
}
```

You will see that we have a close button on each item with an onClick that calls the item's `onDropIndexClick` method. This function removes the item that's found at the index that's passed to it. It's an HOC that needs to be called first with the item's index, then called immediately with the event.

If you call it like this, the function will not work as expected:

```tsx
onClick={(event) => {
  element.onDropIndexClick(element.index);
}}
```

The correct way is to chain the calls:

```tsx
onClick={(event) => {
  element.onDropIndexClick(element.index)(event);
}}
```

Thanks for reading.
