// import {Vertex} from "./vertex";
import {DirectedGraph as Graph} from "./graph";

const foo = new Graph();
foo.addVertex("a");
foo.addVertex("b");
foo.addVertex("c");
const x = foo.getVertex("a");
x.addProperty("kablam", {shits: "giggles"});
x.addProperty("vbbj", "foo");
x.addEdge("b").addEdge("c", 5);
// x.addEdge("c");

// tslint:disable-next-line:no-console
// console.log(foo.getEdges("a"));

const bar = new Graph({
    a: [],
    b: [],
    c: [],
}).addVertex("d");
bar.addEdges("a", ["b", "c"], true).addEdges("a", ["d"], false);

// tslint:disable-next-line:no-console
console.log(JSON.stringify(bar));
