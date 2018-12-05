import {expect} from "chai";
import { DirectedGraph} from "../src/graph";

describe("Graph Constructor", () => {
    it("should return an instance of DirectedGraph", () => {
        const graph = new DirectedGraph();
        expect(graph).instanceOf(DirectedGraph);
    });

    it("should return a graph with an \"a\" node", () => {
        const graph = new DirectedGraph({ a: []} );
        expect(graph.getVertex("a").id).to.equal("a");
    });

    it("getVertices() should return a DirectedGraph vertices", () => {
        const graph = new DirectedGraph( {a : [], b: [], c: [] });
        expect(Object.keys(graph.getVertices()).length).to.equal(3);
    });

    it("should return a graph whose 'a' vertex has two edges b and c", () => {
        const graph = new DirectedGraph({a : ["b", "c"], b: [], c: [] });
        expect(graph.getEdges("a")).to.have.property("b");
        expect(graph.getEdges("a")).to.have.property("c");
    });

    it("should throw an Error if called with invalid edge definitions", () => {
        expect(
            () => new DirectedGraph({a: ["b"]}),
        ).to.throw(Error);
    });

});

describe("Vertex functions", () => {
    const graph = new DirectedGraph( {a: []} );

    it("addVertex(\"b\") should add a vertex b to the graph", () => {
        graph.addVertex("b");
        expect(graph.getVertex("b").id).to.equal("b");
    });

    it("getVertex(\"b\") should retrieve the vertex b", () => {
        expect(graph.getVertex("b").id).to.equal("b");
    });

    it("removeVertex(\"b\") should delete the vertex b", () => {
        graph.removeVertex("b");
        expect( graph.removeVertex("b").getVertex("b") ).to.be.null;
    });

    it("edge definitions should not contain removed vertices", () => {
        const g = graph.getVertex("a");
        expect(g.hasEdge("b")).to.be.false;
    });

    it("hasVertex() should return true if vertex exists ", () => {
        expect(graph.hasVertex("a")).to.be.true;
    });

    it("hasVertex() should return false if vertex doesb't exist ", () => {
        expect(graph.hasVertex("v")).to.be.false;
    });

});

describe("Edge functions", () => {
    const graph = new DirectedGraph();
    graph.addVertex("a").addVertex("b").addVertex("c");

    it("addEdges() should add specified edges to a vertice", () => {
        graph.addEdges("a", ["b", "c"]);
        expect(graph.getEdges("a")).to.haveOwnProperty("b");
    });

    it("addEdges() should throw if invalid edge is specified", () => {
        expect( () => {
            graph.addEdges("a", ["d"]);
        }).to.throw(Error);
    });

    it("addEdges() should throw if invalid vertex is specified", () => {
        expect( () => {
            graph.addEdges("d", ["b"]);
        }).to.throw(Error);
    });

});

describe("Graph traversal functions", () => {

    const graph = new DirectedGraph({a: ["b", ], b: ["c"], c:[], d: []})

    it("hasPath() should return true if a path between vertices exists", () => {
        expect(graph.hasPath("a", "c")).to.be.true;
    });

    it("hasPath() should return true if a path between vertices does not exist", () => {
        expect(graph.hasPath("a", "d")).to.be.false;
    });

    it("getPath() should return an array containing the nodes for a path", () => {
        expect(graph.getPath("a", "c")).to.deep.equal(["a", "b", "c"]);
    });

    it("getPath() should return the empty array if no path exists", () => {
        expect(graph.getPath("a", "d")).to.deep.equal([]);
    });

    it("getTree(rootNode) called with valid root node should return a valid graph definition", () => {
        const g2 = graph.getTree("b");
        expect(g2).to.deep.equal({b: ["c"], c: []});
    });

    it("getTree(rootNode) called with invalid root node should throw", () => {
        expect( () => {
            const g2 = graph.getTree("q");
        }).to.throw(Error);
    });

});