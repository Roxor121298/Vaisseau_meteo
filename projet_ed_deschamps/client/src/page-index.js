// NOTE SUR LOCAL STORAGE ICI!!

// on veut ce rappeler sur quelle vaissseau on a cliquer d'une page a l'autre

//  On veut ce rappeler de si une personne veut sont site en francais ou en anglais

// localStorage.setItem("shipNo, no") <= (ona  decider de faire un genr e de variable qui est storé dans la page de maniere permanente)

// un seul localStorage par site web ( donc ona acces a toute les variable/ objet storé dans le site)

// Localstorage vs sessionStorage (sessionStorage est pour l'onglet seulement)

// trouver l'example de LocalStorage dans l'intranet de Ftheriault

import {chooseLvl} from "./util"


window.addEventListener("load", () => {
        //console.log(document.querySelector("#form"))
        document.querySelector("#form").onsubmit = () => {
            //e.preventDefault()
            let success = true;

            //console.log(document.querySelector("#password").value)

            if (document.querySelector("#password").value != "web2") {
                success = false;
                document.querySelector("#error-message").style.color = "red";
            }

            let nomsValide = document.querySelector("#noms")

            if ((nomsValide.value != "Arthrax") && (nomsValide.value != "Roxor") && (nomsValide.value != "Phénix")) {
                success = false;
                document.querySelector("#error-message").style.color = "red";
            }

            let lvlVal = document.querySelector("#niveaux").value

            chooseLvl(lvlVal)


            //console.log(success)
            return success;
    }
})

