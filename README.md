# Date 3/1/2026

# QuickBite food ordering app


# Features of this app

- Shows Top-Rated restaurants
- Real data from APIs
- Lazzy loading
- Search restaurant
- Routing with dynamic Error Page
- Dynamic routing to show restaurant details
- Custom hook and optimization
- User's Online status
- Lazy Loading for performance optimization
- shimmer UI (dummy ui while loading to set user's mind )
- Tailwind CSS
- HOC for labeling pure veg
- Lifting state Up for Creating Menu with controlled & uncontrolled components.
- Context API

# Parcel

Do following things for us

- It will create Dev Build
- Local server
- HMR- Hot Module Replacement (automatic refresh browser)
- File Watching Algorithm - written in C++
- Faster development experience(faster build) bcz of cache //.parcel-cache
- Image optimization
- Minification of files during build
- Buildling
- Compresses all files
- consistent hashing (keeps track )
- code splitting
- Differntial bundling - to support older browser (takes care of differntial bundling if it needs to run on differnt platform or browsers)
- Diagnostic(Good error handling and good error suggestion)
- provide HTTPs
- Tree shaking - will remove unused code
- Different bundles for dev and production

- for more read documentation of parcel

# React is fast due to those bundlers(here is parcel)

# Dist

- containing production based files
- when we do 'npx parcel build index.html' Dist will bundle all the stuff and folder + files together to make build

# There are 2 type of export -

1.  Default Export :

export default component
import Component from "path"

2.  Named Export : use when u have to export multiple things
    export const Component
    import { Component } from "path"

# React Hook

React hook is normal js Utility function

- useState - superPwerful state variable in react (useState maintains the state of variable)
- useEffect - if u want something to do after rendering our page then use it
  it is a function takes 2 arg

1.  arrow function (callback fn) 2. dependency

# React is effiecient in DOM MAnipulation :

if we need to our data and UI Layer consistent to each other that is where react works when data changes its UI changes (by help of virtual DOM)

- whenever the state variable updates react re renser the component,
  React will keep our UI in sync with the data layer. so as soon as our data will update our ui will update by re rendering

# Re conciliation Algo (React Fiber) - introduced in react 16 :

- it is new way to update react DOM.
- virtual DOM -> react element (object) it is normal js object it is not actual DOM but representaion of actual DOM ;

# Diff algorithm :

- it tries to find out the differnce b/w (nodes of ) old virtual DOM & New virtual DOM then it will update the actual dom on every render cycle
# QuickBite
