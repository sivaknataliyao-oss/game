import { registerEntrance } from './Entrance';
import { registerLivingRoom } from './LivingRoom';
import { registerKitchen } from './Kitchen';
import { registerLibrary } from './Library';
import { registerGarden } from './Garden';
import { registerBedroom } from './Bedroom';
import { registerBathroom } from './Bathroom';
import { registerBasement } from './Basement';
import { registerAttic } from './Attic';
import { registerMirrorRoom } from './MirrorRoom';
import { registerSecretRoom } from './SecretRoom';

export function registerAllRooms(): void {
  registerEntrance();
  registerLivingRoom();
  registerKitchen();
  registerLibrary();
  registerGarden();
  registerBedroom();
  registerBathroom();
  registerBasement();
  registerAttic();
  registerMirrorRoom();
  registerSecretRoom();
}
