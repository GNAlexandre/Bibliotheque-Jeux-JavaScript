//---------Projet Java Alexandre.Tournel et Julian.Wickeur--------

//------------Part Java Alexandre----------------

//------------------Fonction Basique------------
//Fonction ChargerSave
function Charger() {
  mesJeuxStocke = localStorage.getItem("SaveGame"); //Chargement Sauvegarde
  mesJeux = JSON.parse(mesJeuxStocke); //Conversion de la sauvegarde en Objet
}

//Fonction Sauvegarder
function Sauvegarder() {
  mesJeuxSave = JSON.stringify(mesJeux); //Conversion du fichier pour sauvegarder
  localStorage.setItem("SaveGame", mesJeuxSave); //Sauvegarde du fichier nom:SaveGame
}

//Fonction Ajouter Jeux
function Ajouter_Jeux() {
  Charger(); //Appel fonction ChargerSave

  //Function Ajout de jeux
  mesJeux.items.push({
    nom: document.getElementById("un_nom").value,
    date_sortie: document.getElementById("une_date").value,
    nbj_min: document.getElementById("nb_min").value,
    nbj_max: document.getElementById("nb_max").value,
    duree_moy: document.getElementById("tps_de_jeu").value,
    age_min: document.getElementById("age_min").value,
    genre: document.getElementById("genre").value,
    descriptif: document.getElementById("descrip").value,
    prix: document.getElementById("prix").value,
    like: 0,
    image: "ImageJeux.jpg",
  });

  Sauvegarder(); //Appel fonction Sauvegarder
}

function Supprimer_Jeux(i) {
  //Fonction Supprimer Objet Jeux
  Charger(); //Appel charger
  mesJeux.items.splice(i, 1);
  Sauvegarder(); //Appel Sauvegarder
  reload(); //recharger page
}

function Like(i) {
  //Fonction Like
  Charger(); //Appel charger
  mesJeux.items[i].like += 1;
  Sauvegarder(); //Appel Sauvegarder
  reload(); //recharger page
}

function reload() {
  location.reload(); //fonction recharger page (inutile mais simple pour moi à ce souvenir)
}

function Reset_Objet() {
  //Fonction Reset pour Test et rectifier erreur de sauveagarde

  //Création de l'objet mesJeux avec les Jeux configuré par défaut
  mesJeux = {
    items: [
      {
        nom: "MonopolyM",
        date_sortie: "2018-06-12",
        nbj_min: 2,
        nbj_max: 4,
        duree_moy: 60,
        age_min: 7,
        genre: "strategy",
        descriptif: "jeu de riche",
        prix: 35,
        like: 16,
        image: "ImageJeux.jpg",
      },

      {
        nom: "Risk",
        date_sortie: "2008-2-27",
        nbj_min: 2,
        nbj_max: 8,
        duree_moy: 60,
        age_min: 7,
        genre: "strategy",
        descriptif: "Guerre Total",
        prix: 40,
        like: 21,
        image: "ImageJeux.jpg",
      },

      {
        nom: "Les Loups-Garous de Thiercelieux",
        date_sortie: "2001-01-01",
        nbj_min: 6,
        nbj_max: 24,
        duree_moy: 30,
        age_min: 10,
        genre: "jeu de rôle",
        descriptif: "Celui qui mito le mieux",
        prix: 15,
        like: 100,
        image: "ImageJeux.jpg",
      },

      {
        nom: "Times UP",
        date_sortie: "2005-01-01",
        nbj_min: 4,
        nbj_max: 12,
        duree_moy: 45,
        age_min: 12,
        genre: "jeu de mime",
        descriptif: "Une phrase, un mot, un mime",
        prix: 30,
        like: 51,
        image: "ImageJeux.jpg",
      },

      {
        nom: "Poker",
        date_sortie: "1800-01-01",
        nbj_min: 2,
        nbj_max: 10,
        duree_moy: 60,
        age_min: 12,
        genre: "jeu de cartes",
        descriptif: "Souvent tu te fais plumer",
        prix: 20,
        like: 150,
        image: "ImageJeux.jpg",
      },

      {
        nom: "1000 bornes",
        date_sortie: "1954-01-01",
        nbj_min: 2,
        nbj_max: 6,
        duree_moy: 60,
        age_min: 6,
        genre: "jeu de cartes",
        descriptif: "Ne soit pas en excès de vitesse",
        prix: 35,
        like: 60,
        image: "ImageJeux.jpg",
      },
    ],
  };

  Sauvegarder();
  Reset_Research(); //Reset la recherche en même temps(principe d'un bouton de debug)
  //mais fonction Reset_Research() peut aussi etre appler par le boutton du formulaire correspondant
}

//  ---------------Fonction de Création Dynamique--------------

function CreerButton(i) {
  //Creation Boutton dynamique de suppression Objet
  var btn = document.createElement("BUTTON"); // Créer un élément <button>
  var t = document.createTextNode("X"); // Créer un noeud textuel
  btn.appendChild(t); // Ajouter le texte au bouton

  var para = document.getElementById(list[i]);
  para.appendChild(btn); //Ajout du boutton dans l'id démo correspondant

  btn.addEventListener("click", function () {
    Supprimer_Jeux(i); //Appel fonction supprimer Jeux
  });
}

function CreerButtonLike(i) {
  //Creation boutton pour liker un jeu
  var btn = document.createElement("BUTTON"); // Créer un élément <button>
  var t = document.createTextNode("Like"); // Créer un noeud textuel
  btn.appendChild(t); // Ajouter le texte au bouton

  var para = document.getElementById(list[i]);
  para.appendChild(btn);

  btn.addEventListener("click", function () {
    Like(i);
  });
}

function CreerDiv(i, Cname, DivName) {
  //Creation des balises div où seront implementer toute les information sur les jeux
  var div = document.createElement("div");
  div.className = DivName; //Jeux
  div.id = "Jeux" + i;

  var p = document.createElement("p");
  p.id = list[i]; //demo
  div.appendChild(p);

  var listClass = document.getElementsByClassName(Cname); //liste
  listClass[0].appendChild(div);
}

function CreerImage(i) {
  //Creation Image Dynamique
  var img = document.createElement("img"); // Créer un élément <button>
  img.src = mesJeux.items[i].image;

  var div = document.getElementById(list[i]);
  div.appendChild(img); //Ajout de l'image au div ci-dessus
}

function AfficherJeux(i, Cname, DivName) {
  //Fonction Regroupant l'intégralité des fonction précedente pour un affichage dynamique des Jeux
  CreerDiv(i, Cname, DivName);
  CreerImage(i, Cname);
  document.getElementById(list[i]).innerHTML +=
    "<br>" +
    "Nom du Jeu: " +
    mesJeux.items[i].nom +
    "  Date de sortie" +
    mesJeux.items[i].date_sortie;
  document.getElementById(list[i]).innerHTML +=
    "<br>" +
    "Age Minimum: " +
    mesJeux.items[i].age_min +
    ",  pour jouer entre " +
    mesJeux.items[i].nbj_min +
    " et " +
    mesJeux.items[i].nbj_max;
  document.getElementById(list[i]).innerHTML +=
    "<br>" +
    "Durée Moyenne: " +
    mesJeux.items[i].duree_moy +
    " Genre: " +
    mesJeux.items[i].genre;
  document.getElementById(list[i]).innerHTML +=
    "<br>" + "Descriptif : " + mesJeux.items[i].descriptif;
  document.getElementById(list[i]).innerHTML +=
    "<br>" +
    "Prix : " +
    mesJeux.items[i].prix +
    "  Like : " +
    mesJeux.items[i].like +
    " <br>";
  CreerButtonLike(i);
  CreerButton(i);
}

//-----------------Fonction de Recherche----------

function Reset_Research() {
  //Reset L'objet recherche ou son stocker les informations du filtre(plus simple qu'une variable à cause des multi rechargement de la page)
  mesRech = {
    items: [
      {
        research_nom_desc: "",
        research_date_1: "",
        research_date_2: "",
        research_genre: "",
        research_age_min: "",
        research_duree_moy: "",
        research_nbj_joueur: "",
      },
    ],
  };

  mesRechSave = JSON.stringify(mesRech); //Conversion du fichier pour sauvegarder
  localStorage.setItem("SaveRech", mesRechSave); //Sauvegarde du fichier nom:SaveGame;
}

function FiltreNom(i) {
  //Filtre le nom de chaque objet par rapport au nom de la recherche
  var u = mesRech.items.length - 1; //Comme les informations de recherche sont stocker dans un objet, on affiche filtre par rapport à la recherche la plus recente donc la dernière
  //Permet aussi de conserver la dernière recherche effectué
  var chemin = mesRech.items[u].research_nom_desc;
  var items = mesJeux.items[i];

  // ----Programme---
  if (chemin != "") {
    items_rech = items.nom;

    if (items_rech.indexOf(chemin) >= 0) {
      return 1; //true
    } else {
      items_rech = items.descriptif; //Redéfinir Variable
      if (items_rech.indexOf(chemin) >= 0) {
        return 1; //true
      }
      return -1; //false
    }
  }
  return 0; //null
}

function FlitreDate(i) {
  //Filtre le date de chaque objet par rapport à la date de la recherche
  var u = mesRech.items.length - 1;
  var chemin_1 = mesRech.items[u].research_date_1;
  var chemin_2 = mesRech.items[u].research_date_2;
  var items = mesJeux.items[i].date_sortie;

  if (chemin_1 != "" && chemin_2 == "") {
    if (chemin_1 <= items) {
      //après la date de sortie
      return 1;
    }
    return -1;
  }

  if (chemin_1 == "" && chemin_2 != "") {
    if (chemin_2 >= items) {
      //avant la date de sortie
      return 1;
    }
    return -1;
  }

  if (chemin_1 != "" && chemin_2 != "") {
    if (chemin_1 <= items && chemin_2 >= items) {
      //entre 2 date
      return 1;
    }
    return -1;
  }
  return 0;
}

function FiltreGenre(i) {
  //Filtre le genre de chaque objet par rapport au genre de la recherche
  var u = mesRech.items.length - 1;
  var chemin = mesRech.items[u].research_genre;
  var items = mesJeux.items[i].genre;

  if (chemin != "") {
    if (chemin == items) {
      //Verifie le genre demander
      return 1;
    }
    return -1;
  }
  return 0;
}

function FiltreAgeMin(i) {
  //Filtre l'age minimum' de chaque objet par rapport à l'age de la recherche
  var u = mesRech.items.length - 1;
  var chemin = mesRech.items[u].research_age_min;
  var items = mesJeux.items[i].age_min;

  if (chemin != "") {
    if (chemin <= items) {
      //Verifie l'age minimum supérieur à l'age demandé
      return 1;
    }
    return -1;
  }
  return 0;
}

function FiltreDuree(i) {
  //Filtre la duree de chaque objet par rapport à la duree de la recherche
  var u = mesRech.items.length - 1;
  var chemin = mesRech.items[u].research_duree_moy;
  var items = mesJeux.items[i].duree_moy;

  if (chemin != "") {
    if (chemin >= items) {
      //Verifie le temps
      return 1;
    }
    return -1;
  }
  return 0;
}

function FiltreJoueur(i) {
  //Filtre le nombre de joueur de chaque objet par rapport au parametre de la recherche
  var u = mesRech.items.length - 1;
  var chemin = mesRech.items[u].research_nbj_joueur;
  var items_1 = mesJeux.items[i].nbj_min;
  var items_2 = mesJeux.items[i].nbj_max;

  if (chemin != "") {
    if ((chemin >= items_1, chemin <= items_2)) {
      //Verifie que le nombre de joueur est compris entre les 2 paramètres
      return 1;
    }
    return -1;
  }
  return 0;
}

function FiltreFinal(i) {
  //Fonction Filtre Final qui permet de compiler les resultats de tous les filtres précédent
  //Si fonction renvoie 1 ou plus c'est que l'objet correspond à au moins 1 paramètre
  //Si fonction renvoie -1 c'est qu'un paramètre ou plus ne correspond pas à la recherche
  //Si la fonction renvoie 0 c'est qu'on a remplie aucun paramètre
  cpt = 0;
  if (FiltreNom(i) == -1) {
    return -1;
  }
  cpt += FiltreNom(i);

  if (FlitreDate(i) == -1) {
    return -1;
  }
  cpt += FlitreDate(i);

  if (FiltreGenre(i) == -1) {
    return -1;
  }
  cpt += FiltreGenre(i);

  if (FiltreAgeMin(i) == -1) {
    return -1;
  }
  cpt += FiltreAgeMin(i);

  if (FiltreDuree(i) == -1) {
    return -1;
  }
  cpt += FiltreDuree(i);

  if (FiltreJoueur(i) == -1) {
    return -1;
  }
  cpt += FiltreJoueur(i);
  return cpt;
}

function Creation_Li(i, ul) {
  //Fonction de Cration Balise Li ou seront ajouter les infos des jeux rechercher
  var li = document.createElement("li");
  li.id = "li_" + i;
  ul.appendChild(li);
  list_li.push("li_" + i); //Liste Li avec les id permettant l'affichage dynamique
  return list_li;
}

function Nouvelle_Recherche() {
  //Ajoute une nouvelle recherche
  mesRech.items.push({
    //Enregistrer Paramètre Recherche
    research_nom_desc: document.getElementById("Nom_rech").value,
    research_date_1: document.getElementById("Date_1").value,
    research_date_2: document.getElementById("Date_2").value,
    research_genre: document.getElementById("Genre_rech").value,
    research_age_min: document.getElementById("Age_min_rech").value,
    research_duree_moy: document.getElementById("Duree_rech").value,
    research_nbj_joueur: document.getElementById("Joueur_rech").value,
  });

  mesRechSave = JSON.stringify(mesRech); //Conversion du fichier pour sauvegarder
  localStorage.setItem("SaveRech", mesRechSave); //Sauvegarde du fichier nom:SaveGame;
  reload();
  var ul = document.getElementById("result"); //Supprime les elements de la recherche précédente de ul pour eviter des compilations et probleme d'affichage
  ul.parentNode.removeChild(ul);
  AfficherRech();
}

function Recherche_Jeux() {
  //Création Balise Ul et creation des enfants li de cette dernière

  var ul = document.createElement("ul"); //creation Balise Ul
  ul.id = "result";

  list_li = [];
  for (i = 0; i < mesJeux.items.length; i++) {
    //On regarde pour tous les objets présent si il correspond à la recherche
    if (FiltreFinal(i) > 0) {
      list_li = Creation_Li(i, ul); //Creation du nombre d'enfant necessaire repondant au critère du filtre
    }
  }
  var p = document.createElement("p");
  p.appendChild(ul);
  

  var listClass = document.getElementsByClassName("ResultAvant"); //integration Ul dans page HTML
  listClass[0].appendChild(p);
  return list_li; //Renvoie List_Li pour ensuite faire un affichage dynamique
}

function AfficherRech() {
  //Fonction Affichage dynamique des informations de la recherche
  list_li = Recherche_Jeux();
  var cpt = 0;

  for (i = 0; i < mesJeux.items.length; i++) {
    if (FiltreFinal(i) > 0) {
      console.log("J'affiche l'items" + i);
      document.getElementById(list_li[cpt]).innerHTML +=
        "<li>" +
        "Nom du Jeu: " +
        mesJeux.items[i].nom +
        "  Date de sortie" +
        mesJeux.items[i].date_sortie;
      document.getElementById(list_li[cpt]).innerHTML +=
        "Age Minimum: " +
        mesJeux.items[i].age_min +
        ",  pour jouer entre " +
        mesJeux.items[i].nbj_min +
        " et " +
        mesJeux.items[i].nbj_max;
      document.getElementById(list_li[cpt]).innerHTML +=
        "Durée Moyenne: " +
        mesJeux.items[i].duree_moy +
        " Genre: " +
        mesJeux.items[i].genre;
      document.getElementById(list_li[cpt]).innerHTML +=
        "Descriptif : " + mesJeux.items[i].descriptif;
      document.getElementById(list_li[cpt]).innerHTML +=
        "Prix : " +
        mesJeux.items[i].prix +
        "  Like : " +
        mesJeux.items[i].like +
        " </li>";
      cpt += 1;
    }
  }
}

//               ----------Execution JavaScript------------

//Chargement de la sauvegarde
mesJeuxStocke = localStorage.getItem("SaveGame"); //Chargement Sauvegarde
mesJeux = JSON.parse(mesJeuxStocke);
mesRechStocke = localStorage.getItem("SaveRech"); //Chargement Sauvegarde
mesRech = JSON.parse(mesRechStocke); //Conversion de la sauvegarde en Objet
console.log(mesJeux); //Test
console.log(mesRech);

//Liste d'emplacement pour l'affichage des images
list = [
  "demo_0",
  "demo_1",
  "demo_2",
  "demo_3",
  "demo_4",
  "demo_5",
  "demo_6",
  "demo_7",
  "demo_8",
  "demo_9",
];

//Affichage des Objets
for (i = 0; i < mesJeux.items.length - 1; i++) {
  if ((i < list.length, i < 9)) {
    //limite le nombre de jeux afficher pour que ce soit plus esthétique
    AfficherJeux(i, "Liste", "Jeux");
  }
}
AfficherJeux(mesJeux.items.length - 1, "MiseAvant", "First"); //Jeux mise en Avant avec une classe et un id particulier
AfficherRech(); //Appel Affichage de la recherche de jeux

//                  ----------Part Julian -----------
//Formulaire
document.getElementById("un_nom").addEventListener("focus", function () {
  document.getElementById("aideNom").textContent = "Entrez votre pseudo";
  document.getElementById("un_nom").style.backgroundColor = "red";
});

// Remise à zéro
function resetForm(node) {
  let tabReset = [
    "un_nom",
    "aideNom",
    "une_date",
    "nb_min",
    "nb_max",
    "tps_de_jeu",
    "age_min",
    "genre",
    "descrip",
    "prix",
  ];
  for (let key in tabReset) {
    document.getElementById(tabReset[key]).style = "";
    document.getElementById(tabReset[key]).textContent = "";
  }
}

// Véridication de la longueur du pseudo : déclenché sur le blur et appelé par VerifForm
function verifDescrip(node) {
  if (node.value.length < 2 || node.value.length > 100) {
    node.style.backgroundColor = "pink";
    return false;
  }
  return true;
}
