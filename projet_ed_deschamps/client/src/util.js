
export const chooseLvl = no => {
    console.log(no)
    localStorage.setItem("lvlnumb", no);
    window.location.href = "meteo.html";
    window.location.href = "index.html";	
}

// vieux lab des monstres

// Permet de faire une rotation d'un élément pour un angle donné.
// Exemple : rotateElement(document.getElementById("elem"), 45).
//			 Prend le DIV#elem dans son angle original (0) et fait une
//			 rotation de 45 degré.
export const rotateElement = (node, angle) => {
    let properties = ['transform'];
    let p = null;
    let result = null;
    
    while (p = properties.shift()) {
        if (typeof node.style[p] != 'undefined') {
            result = p;
        }
    }
    
    if (result != null) {
    	node.style[result] = 'rotate(' + angle + 'deg)';
	}
}

// L'angle 0 correspond au nord (vers le haut)
// Exemple : getElementAngle(posElementX, posElementY, posSourisX, posSourisY)
//			 Ceci retournera l'angle de l'élément par rapport à la position de la souris
export const getElementAngle = (x1, y1, x2, y2) => {
	let adj = x2 - x1;
	let opp = y2 - y1;
	
	let angle = Math.abs(Math.atan(opp/adj) * 180/Math.PI);
	
	if (adj > 0 && opp < 0 ) {
		angle = 90 - angle;
	}
	else if (adj >= 0 && opp >= 0) {
		angle += 90;
	}
	else if (adj < 0 && opp >= 0) {
		angle = 180 + (90 - angle);
	}
	else {
		angle += 270;
	}
	
	return angle;
}