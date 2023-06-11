import { AvatarGenerator } from "random-avatar-generator";

const generator = new AvatarGenerator();
 
// Simply get a random avatar
const ava = generator.generateRandomAvatar("Quang");
console.log(ava);