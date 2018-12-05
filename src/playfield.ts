import { DirectedGraph } from "./graph";
import { Vertex } from "./vertex";

interface IVerticesDefinition {
    [key: string]: string[];
}

interface IRegion {
    [key: string]: {
        id: string,
        owner: string|null,
        territories: Vertex[];
    };
}

interface IPlayField {
    setTerritoryProperty(vertexId: string, property: string, value: any): this;
    getTerritoryProperty(vertexId: string, property: string): any;
    setTerritoryName(vertexId: string, name: string): this;
    getTerritoryName(id: string): string;
    setTerritoryOwner(vertexId: string, playerId: string): this;
    getTerritoryOwner(vertexId: string): string; // should be Vertex?
}

class PlayField extends DirectedGraph implements IPlayField {

//    private properties: IMapReference;
    private regions: IRegion = {};

    constructor(mapDefinition: IVerticesDefinition = null, regionDefinition?: any) {
        super(mapDefinition);
        return this;
    }

    public setTerritoryProperty(vertexId: string, property: string, value: any): this {
        this.getVertex(vertexId).setProperty(property, value);
        return this;
    }

    public getTerritoryProperty(vertexId: string, property: string): any {
        return this.getVertex(vertexId).getProperty(property);
    }

    public setTerritoryName(vertexId: string, name: string): this {
        this.getVertex(vertexId).setProperty("name", name);
        return this;
    }

    public getTerritoryName(id: string): string {
        return this.getVertex(id).getProperty("name");
    }

    public setTerritoryOwner(vertexId: string, playerId: string): this {
        this.getVertex(vertexId).setProperty("owner", playerId);
        const vertex = this.getVertex(vertexId);
        const regionId = vertex.getProperty("region");
        if (this.regionIsOwned(regionId, playerId)) {
            this.setRegionOwner(regionId, playerId);
        }
        return this;
    }

    public getTerritoryOwner(vertexId: string): string {
        return this.getVertex(vertexId).getProperty("owner");
    }

    public getRegion(id: string): {} {
        return this.regions[id];
    }

    public getAllRegions(): any {
        return this.regions;
    }

    public getRegionOwner(regionId: string): string|null {
        return this.regions[regionId].owner;
    }

    public setRegionOwner(regionId: string, ownerId: string): this {
        this.regions[regionId].owner = ownerId;
        return this;
    }

    public getTerritoryCoordinates(territoryId: string): number[] {
        const v = this.getVertex(territoryId);
        return [ v.getProperty("x"), v.getProperty("y") ];
    }

    public setTerritoryCoordinates(territoryId: string, x: number, y: number): this {
        const v = this.getVertex(territoryId);
        v.setProperty("x", x).setProperty("y", y);
        return this;
    }

    public setTerritoryMapReference(territoryId: string, ref: string): this {
        this.getVertex(territoryId).setProperty("mapRef", ref);
        return this;
    }

    public getTerritoryMapReference(territoryId: string): string {
        return this.getVertex(territoryId).getProperty("mapRef");
    }

    public setTroopCount(territoryId: string, count: number): this {
        const territory = this.getVertex(territoryId);
        this.getVertex(territoryId).setProperty("troopCount", count);
        return this;
    }

    public getTroopCount(territoryId: string): number {
        return this.getVertex(territoryId).getProperty("troopCount");
    }

    public setRegion(regionId: string, vertices: string[]): this {
        this.regions[regionId] = {
            id: regionId,
            owner: null,
            territories: vertices.map( (val) => {
                return this.getVertex(val).setProperty("region", regionId);
            }),
        };
        return this;
    }

    protected regionIsOwned(regionId: string, ownerId: string): boolean {
        for (const t of this.regions[regionId].territories) {
            if (t.getProperty("owner") !== ownerId) {
                return false;
            }
        }
        return true;
    }

}

export {PlayField};
