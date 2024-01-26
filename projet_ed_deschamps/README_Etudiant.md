



## Utilisation de la page d'index

    Noms d'utilisateur valide : Roxor, Arthrax ou Phénix
    mots de passe : web2

    On peut choisir le thème (Printemps, Hivers, Automne) 
        Chacun on une température avec une longitude latitude différence associé

## Utilisation de la page météo

    -La apparentTemperature est afficher en haut du background de jeu (pas la température donc)

    -Note le "bouton" Quitter est désactivé par le "onclick" pour le vaisseau
        -Dans le code du vaisseau il y a des fonctions qui utilisent le "q" et le "e" a la place si tu préfère
            -Ca va rétablir le bouton quitter puisque empêcher le preventDefault()
        -On peut simplement utiliser la touche Escape a la place pour quitter

    Le vaisseau est contrôler avec 'w' 'a' 's' 'd' et peut tirer avec le clic gauche et le clic droit 
        - Il peut bouger en diagonale
        - Il ne peut pas sortir de l'écran peut importe sa taille (il reste jammer dans un coin parfois)
        - Il pointe vers la du curseur (de la souris)
        - Il tire des missile qui montent la apparentTemperature quand ils sont remove (doc et liste)
        - Il tire des boule de froid qui descende la apparentTemperature quand ils sont remove (doc et liste)
        - Les missiles ou les boules peuvent entrer en collision un EvilBug et le remove de cette facon

    Des EvilBug apparaissent dans l'écran à une position aléatoire à tout les 2 secondes
        - Ils apparaissent à une endroit aléatoire dans la fenêtre peut import sa taille
        - Leurs apparence change en fonction de la apparentTemperature
        - Ils commencent à poursuivre le vaisseau une fois qu'ils apparaissent
        - S'ils entre en collision avec un missile ils sont remove (doc et liste)

    La classe balle correspond aux missiles et au boule froid
        -Il sont animer avec TiledImage (même si ça ne parait pas beaucoup)
        -Il ont un effet sur la apparentTemperature si il sont remove (même si il n'atteigne pas un EvilBug)

    -La apparentTemperature peut être modifier aussi en utilisant UpArrow et Downarrow avec le clavier
        - modifiera la apparentTemperature

    -S'il neige un bigBeaver apparaitra périodiquement et traversera l'écran
        -On peut peser sur b pour togle on and off la neige.





