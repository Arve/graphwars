interface IVertex {
    readonly id: string;
    readonly edges: IEdge;
    readonly properties: IProperty;
    addEdge(id: string): Vertex;
    removeEdge(id: string): Vertex;
    hasEdge(id: string): boolean;
    setWeight(id: string, weight: number): Vertex;
    setProperty(id: string, value: any): Vertex;
}

interface IEdge {
    [key: string]: number;
}
interface IProperty {
    [key: string]: any;
}

class Vertex implements IVertex {
    public readonly id: string;
    public readonly edges: IEdge = {};
    public readonly properties: IProperty = {};

    constructor(id: string) {
        this.id = id;
        return this;
    }

    public hasEdge(id: string): boolean {
        return this.edges.hasOwnProperty(id);
    }

    public addEdge(id: string, weight: number = 0): this {
        if (!this.hasEdge(id)) {
            this.edges[id] = weight;
        }
        return this;
    }

    public removeEdge(id: string): this {
        if (this.hasEdge(id)) {
            delete this.edges[id];
        }
        return this;
    }

    public getEdges(): IEdge {
        return this.edges;
    }

    public setWeight(id: string, weight: number): this {
        if (this.hasEdge(id)) {
            this.edges[id] = weight;
        }
        return this;
    }

    public hasProperty(prop: string): boolean {
        return this.properties.hasOwnProperty(prop);
    }

    public addProperty(prop: string, value: any): this {
        if (!this.hasProperty(prop)) {
            this.properties[prop] = value;
        }
        return this;
    }

    public removeProperty(prop: string): this {
        if (this.hasProperty(prop)) {
            delete this.properties[prop];
        }
        return this;
    }

    public setProperty(prop: string, value: any): this {
        if (this.hasProperty(prop)) {
            this.properties[prop] = value;
        }
        return this;
    }

}

export {Vertex};
