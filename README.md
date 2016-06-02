#Sentinel

##Refactoring

* Redux,like Data Structure/Trigger

* ES6,like

```
  var => const/let
  lambda function
```

* React rule,like

```
 Header.propTypes = {
   optionalArray: PropTypes.array,
   optionalBool: PropTypes.bool,
   optionalFunc: PropTypes.func,
   optionalNumber: PropTypes.number,
   optionalObject: PropTypes.object,
   optionalString: PropTypes.string,

   // Anything that can be rendered: numbers, strings, elements or an array (or fragment) containing these types.
   optionalNode: PropTypes.node,

   // A React element.
   optionalElement: PropTypes.element,

   // You can also declare that a prop is an instance of a class. This uses JS's instanceof operator.
   optionalMessage: PropTypes.instanceOf(Message),

   // You can ensure that your prop is limited to specific values by treating it as an enum.
   optionalEnum: PropTypes.oneOf(['News', 'Photos']),

   // An object that could be one of many types
   optionalUnion: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.instanceOf(Message)
   ]),

   // An array of a certain type
   optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),

   // An object with property values of a certain type
   optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),

   // An object taking on a particular shape
   optionalObjectWithShape: React.PropTypes.shape({
     color: React.PropTypes.string,
     fontSize: React.PropTypes.number
   }),

   // You can chain any of the above with `isRequired` to make sure a warning is shown if the prop isn't provided.
   requiredFunc: React.PropTypes.func.isRequired,

   // A value of any data type
   requiredAny: React.PropTypes.any.isRequired,

   // You can also specify a custom validator. It should return an Error object if the validation fails. Don't `console.warn` or throw, as this won't work inside `oneOfType`.
   customProp: function(props, propName, componentName) {
     if (!/matchme/.test(props[propName])) {
        return new Error(
          'Invalid prop `' + propName + '` supplied to' +
          ' `' + componentName + '`. Validation failed.'
        );
     }
    },

    // You can also supply a custom validator to `arrayOf` and `objectOf`. It should return an Error object if the validation fails. The validator will be called for each key in the array or object. The first two arguments of the validator are the array or object itself, and the current item's key.
    customArrayProp: React.PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
      if (!/matchme/.test(propValue[key])) {
        return new Error(
          'Invalid prop `' + propFullName + '` supplied to' +
          ' `' + componentName + '`. Validation failed.'
        );
      }
    })
  },
 }
```

##ToDo

* POST

```
 1 image format binary not base64
 2 support audio & video
 3 support different kind of ML,like
    (1) assign someone to find the ML  
    (2) public ML
    (3) locked ML which needs password
```

```


```
