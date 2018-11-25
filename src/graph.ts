import {Vertex} from "./vertex";

interface IVerticesDefinition {
    [key: string]: any;
}

class DirectedGraph {

    protected vertices: {[key: string]: Vertex} = {};

    constructor( init?: IVerticesDefinition) {
        if (init) {
            // unsavory, but safer
            for (const key of Object.keys(init)) {
                this.vertices[key] = new Vertex(key);
            }
            for (const key of Object.keys(init)) {
                this.addEdges(key, init[key]);
            }

        }
        return this;
    }

    public hasVertex(id: string): boolean {
        return this.vertices.hasOwnProperty(id);
    }

    public addVertex(id: string): this {
        if (!this.hasVertex(id)) {
            this.vertices[id] = new Vertex(id);
        }
        return this;
    }

    public getVertex(id: string): Vertex|null {
        return this.vertices[id] || null;
    }

    public addEdges(id: string, edges: string[]|string, bidirectional?: boolean): this {
        if (typeof edges === "string") {
            edges = [edges];
        }
        edges.forEach( (element) => {
            if (this.hasVertex(element)) {
                this.getVertex(id).addEdge(element);
                if (bidirectional) {
                    this.getVertex(element).addEdge(id);
                }
            } else {
                throw new Error(`GRAPH_EDGE_ERROR: "${element}" is not a valid vertex`);
            }
        });
        return this;
    }

    public getEdges(id: string): object {
        return this.getVertex(id).edges;
    }
}

export {DirectedGraph};
