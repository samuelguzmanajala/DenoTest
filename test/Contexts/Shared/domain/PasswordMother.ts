import masculine_name from "https://deno.land/x/deno_faker@v1.0.3/lib/locales/nb_NO/name/masculine_name.ts";
import { MotherCreator } from "./MotherCreator.ts";

export class PasswordMother{
    static random(): string {
        const rand: number = Math.floor(Math.random()*10) + 10;
        return MotherCreator.random().random.alphaNumeric(rand);
    }
}