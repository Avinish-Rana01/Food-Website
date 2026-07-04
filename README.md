There are two types of Export/Import

1). Default Export/Import 

syntax:- 
for Export => export default Component;
for Import => import Component from "path"; 


2). Named Export/import 

syntax:-
for Export => export const Component;
for Import => import {Component} from "path";

for example :- import { Header } from "./components/Header"; 
//We can also import like this by putting the component in braces.

So when it is required to export the multiple things from a file, use Name export otherwise if there is a single component to export use Default Export/Import


# React Hooks 
(Normal JS utilty fuctions)
- useState() - Use to generate the Super powerful variable
- useEffect()

=> Whenever a state variable updates reatc re-renders the component.

React uses reconciliation algorithm(React Fiber)
 
