import {Vertex} from "./vertex";

interface IVerticesDefinition {
    [key: string]: string[];
}

interface IDirectedGraph {
    vertices: {};
    hasVertex(id: string): boolean;
    addVertex(id: string): this;
    getVertex(id: string): Vertex|null;
    getVertices(): object;
    addEdges(id: string, edges: string[]|string, bidirectional: boolean): this;
    getEdges(id: string): object;
    getTree(rootNode: string): object;
}

class DirectedGraph implements IDirectedGraph {

    public readonly vertices: {[key: string]: Vertex} = {};

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

    public removeVertex(id: string): this {
        if (this.vertices.hasOwnProperty(id)) {
            delete this.vertices[id];
        }
        for (const key of Object.keys(this.vertices)) {
            this.getVertex(key).removeEdge(id);
        }
        return this;
    }

    public addEdges(id: string, edges: string[]|string, bidirectional?: boolean): this {
        if (!this.getVertex(id)) {
            throw new Error(`${id} is not a valid vertex`);
        }

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
                throw new Error(`"${element}" is not a valid edge`);
            }
        });
        return this;
    }

    public getEdges(id: string): object {
        return this.getVertex(id).edges;
    }

    public getVertices(): object {
        return this.vertices;
    }

    public getPath(from: string, to: string|null): any {
        interface IPathMeta {
            [key: string]: boolean;
        }
        interface IMeta {
            [key: string]: string|null;
        }
        const queue = [ from ];
        const root: IPathMeta = {from: true};
        const meta: IMeta = {};
        while (queue.length) {
            const current = queue.shift();
            if ( current === to) {
                return this.constructPath(to, meta);
            }

            for (const edge of Object.keys(this.getVertex(current).edges))  {
                if (!root.hasOwnProperty(edge)) {
                    meta[edge] = current;
                    root[edge] = true;
                    queue.push(edge);
                }
            }
        }
        return [];
    }

    public hasPath(from: string, to: string) {
        if (this.getPath(from, to).length > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Get a tree/directed graph definition object with a specified root node
     * that can be passed as a constructor to a new graph
     *
     * @param rootNode The root of the tree
     * @returns Object that can be passeed as constructor to new Graph();
     */
    public getTree(rootNode: string): object {
        interface IPathMeta {
            [key: string]: boolean;
        }

        if (!this.getVertex(rootNode)) {
            throw new Error(`${rootNode} is not a valid vertex`);
        }

        const queue = [rootNode];
        const tree: any = {};
        while (queue.length) {
            const current = queue.shift();
            const edges = this.getVertex(current).getEdges();
            tree[current] = [];
            for (const edge of Object.keys(edges))  {
                if (!tree.hasOwnProperty(edge)) {
                    tree[edge] = [];
                    tree[current].push(edge);
                    queue.push(edge);
                }
            }
        }
        return tree;
    }

    private constructPath(from: string,  meta: any ): string[] {
//        console.log(from, meta);
        interface IMeta {
            [key: string]: any[];
        }

        const actionList: any[] = [from];
        let action = meta[from];

        while (meta.hasOwnProperty(action)) {
            actionList.push(action);
            action = meta[action];
        }
        actionList.push(action);
        return actionList.reverse();
    }
}

export {DirectedGraph};
