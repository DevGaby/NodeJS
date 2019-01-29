
const fs =  require('fs');

// Créaton des fct qui feront les commandes - Notation ES6

// Sauvegarde des notes dans le fichier json
var savedNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes))
};

// Creation d'un fichier json de toutes les notes
var fetchNotes = ()=> { // Récupération des notes existantes
  try{
    var notes = fs.readFileSync('notes-data.json'); // Generera le fichier listant toutes les taches
    return JSON.parse(notes);
  } catch(e) {
    return [];
  }
}

// Création d'une note
var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title : title,
    body : body
  };

  // Verification de doublon
  var duplicatedNotes = notes.filter(elem => elem.title === note.title);
  // Tableau vide => Pas de duplicata === TRUE
  if (duplicatedNotes.length === 0) {
    notes.push(note);
    savedNotes(notes);
    return note; // Retourne la note
  } else {
    return false;
    //console.log('Titre de note déjà existant');
  }
}

// Retourne la note possedant le titre passé en parametre
var getNote = (title) => {
  var notes = fetchNotes();
  var fiteredNotes = notes.filter( elem => elem.title === title);
  return fiteredNotes[0]; // un seul element issu du filtre
}

// Supprime la note possedant le titre passé en parametre
var remoteNote = (title) => {
  var originalNotes = fetchNotes();
  var notes = originalNotes.filter( elem => elem.title !== title);
  savedNotes(notes);
  return originalNotes.length !== notes.length; // renvoie booléen
  // permettant de savoir si une note a été supprimée
}

// Affiche une note
var logNote = (note) => {
  console.log('*********************');
  console.log(`Titre: ${note.title}`);
  console.log(`Contenu: ${note.body}`);
  console.log('*********************');
}

// Modifier une note
var updateBody = (title, body) => {
    var noteUpdate = {
      title : title,
      body : body
    };
    var notes = fetchNotes();
    var note = notes.filter( elem => elem.title === title);
    console.log(note);
    
    notes.push(noteUpdate);
    savedNotes(notes);
    remoteNote(title);
    return noteUpdate;
}

// Export des fonctions pour les utiliser dans app.js
module.exports = {
  // Pour infos :
  //'savedNotes': savedNotes  - Notation ES5
  savedNotes,
  fetchNotes,
  addNote,
  getNote,
  remoteNote,
  logNote,
  updateBody,
};