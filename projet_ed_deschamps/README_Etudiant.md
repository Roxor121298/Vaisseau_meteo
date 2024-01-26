



## Utilisation de la page d'index

    Noms d'utilisateur valide : Roxor, Arthrax ou Phénix
    mots de passe : web2

    On peut choisir le thème (Primtemps, Hivers, Automne) 
        Chacun on une température avec une longitude latitude différence associé


## Utilisation de la page meteo

    -La apparentTemperature est afficher en haut du background de jeu (pas la temperature donc)

    -Note le "bouton" Quitter est désactivé par le "onclick" pour le vaisseau
        -Dans le code du vaisseau il y a des fonction qui utilisent le "q" et le "e" a la place si tu préfere
            -Ca va rétablir le bouton quitter puisque empecher le preventDefault()
        -On peut simplement utiliser la touche Escape a la place pour quitter

    Le vaisseau est contrôler avec 'w' 'a' 's' 'd' et peut tirer avec le clic gauche et le clic droit 
        - Il peut bouger en diagonale
        - Il ne peut pas sortir de l'écran peut importe sa taille (il reste jammer dans un coin parfois)
        - Il pointe vers la du curseur (de la souris)
        - Il tire des missile qui montent la apparentTemperature quand ils sont remove (doc et liste)
        - Il tire des boule de froid qui descende la apparentTemperature quand ils sont remove (doc et liste)
        - Les missiles ou les boules peuvent entrer en collision un EvilBug et le remove de cette facon

    Des EvilBug apparaissent dans l'écran à une position aléatoire à tout les 2 secondes
        - Ils apparaissent à une endroit aléatoire dans la fenetre peut import sa taille
        - Leurs apparence change en fonction de la apparentTemperature
        - Ils commencent à poursuivre le vaisseau une fois qu'ils apparaissent
        - S'ils entre en collision avec un missile il sont remove (doc et liste)

    La classe balle correspond aux missile et au boule froid
        -Il sotn animer avec TiledImage (meme si ca ne parrait pas beaucoup)
        -Il on un effect sur la apparentTemperature si il sont remove (meme si il n'atteigne pas un EvilBug)

    -La apparentTemperature peut etre modifier aussi en utilisant UpArrow et Downarrow avec le clavier
        - modifiera la apparentTemperature

    -S'il neige un bigBeaver apparaittra périodiquement et tranversera l'écran
        -On peut peser sur b pour togle on and off la neige.



