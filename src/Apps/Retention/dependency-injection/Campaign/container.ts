import { ServiceCollection } from "di/mod.ts";
import { CampaignDI } from "./CampaingDI.ts";

const container = new ServiceCollection();

new CampaignDI(container);

export default container;