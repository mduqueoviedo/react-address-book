import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUserPlus,
  faEdit,
  faTrashAlt,
  faGlobeEurope,
  faTimes,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { faUser, faEnvelope } from '@fortawesome/free-regular-svg-icons';

export const initFontAwesomeIcons = () => {
  library.add(
    faUserPlus,
    faEdit,
    faTrashAlt,
    faGlobeEurope,
    faTimes,
    faUser,
    faEnvelope,
    faExclamationTriangle
  );
};
