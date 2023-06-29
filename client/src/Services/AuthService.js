
import navConfig from '../Config/config-nav.json'

    export function getMenuItem(currentUser){
        let items;
        if (currentUser) {
            if (currentUser === 'unauthorized') {
                items = navConfig.unauthorized
            } else {
                items = navConfig.authorized
            }
        }
        return items
    }
   

