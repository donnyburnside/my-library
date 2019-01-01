const MyLibrary = require('../src/MyLibrary').default;

test('Initialising MyLibrary with a missing "selector" argument should set the element property to null', () => {
    let test_case = new MyLibrary();

    expect(test_case.element).toBeDefined();
    expect(test_case.element).toBeNull();
});

test('Initialising MyLibrary with a "selector" argument that doesnt match an existing DOM node should set the element property to null', () => {
    let test_case = new MyLibrary('#fake-element');

    expect(test_case.element).toBeDefined();
    expect(test_case.element).toBeNull();
});

test('Initialising MyLibrary with a "selector" argument that matches an existing DOM node should set the element property to the matching node', () => {
    document.body.innerHTML = `<div id="my-library"></div>`;

    let selector = '#my-library',
        test_case = new MyLibrary(selector);

    expect(test_case.element).toBeDefined();
    expect(test_case.element).not.toBeNull();
    expect(test_case.element instanceof Element).toBeTruthy();
    expect(test_case.element).toEqual(document.querySelector(selector));
});

test('Calling the "init" method after failing to initialise MyLibrary correctly should return false', () => {
    let test_case = new MyLibrary();

    expect(test_case.init()).toBe(false);
});

test('Calling the "init" method should set the content of the "element" node to "Hello world!"', () => {
    document.body.innerHTML = `<div id="my-library"></div>`;

    let test_case = new MyLibrary('#my-library');
    test_case.init();

    expect(test_case.element.textContent).toBe('Hello world!');
});