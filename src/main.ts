// import {Vertex} from "./vertex";
// import {DirectedGraph as Graph} from "./graph";
import {PlayField as PF} from "./playfield";

const pf = new PF();
pf.addVertex("West Virginia");
pf.getVertex("West Virginia").setProperty("name", "West Virginia");
pf.setRegion("North America", ["West Virginia"]);
pf.setTerritoryOwner("West Virginia", "Player 1").setTroopCount("West Virginia", 72);
// tslint:disable-next-line:no-console
console.log( pf );

// tslint:disable-next-line:no-console
// console.log( pf.getVertex("a").properties);
