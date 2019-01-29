
// C'est le point d'entré de l'application
/* Nous allons créer un applications qui permet de gerer des notes
 - Creer des notes,
 - Lister des notes,
 - Lire des notes,
 - Supprimer des notes,
*/

const notes = require('./notes');
const yargs = require('yargs');

// Initilalisation de la liste avec des premieres notes 
/* A DECOMMENTER A LA 1ER UTILISATION */
//  notes.savedNotes([
//   {title: 'Vaisselle', body: 'Faire la vaiselle  aprés chaque repas'},
//   {title: 'Poubelle', body: 'A sortir le mardi & le jeudi'}
// ]);

// Ajout d'une nouvelle note
// var result = notes.addNote('Angular', 'Framework JS côté client');
// var command = process.argv[2];

var titleOptions = {
  describe: 'Titre de la note',
  alias: 't',
  required: true
};

var bodyOptions = {
  describe: 'Contenu de la note',
  alias: 'b',
  required: true
};

// création du menu d'aide
// node app.js add --help
const argv = yargs
.command('add', 'Ajoute une note', {
  title: titleOptions,
  body: bodyOptions
})
.command('list', 'Affiche la liste des notes')
.command('read', 'Lit une note', { title: titleOptions })
.command('remove', 'Supprime une note', { title: titleOptions })
.command('update', 'Modifie une note', {title:titleOptions, body: bodyOptions})
.help()
.argv;

// Récupère le nom de la commande
var command = yargs.argv._[0];


if(command === 'add') { // node .\app.js add -t "Blabla" -b "lala"
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Note ajoutée avec succès');
    notes.logNote(note);
  }else { // addNote a renvoyé false
    console.log('Ce titre existe déjà');
  }
}else if (command === 'list') { // node .\app.js list
  var list = notes.fetchNotes();
  if (list.length > 0) {
    console.log('--- Liste de notes ---');
    list.forEach(note => notes.logNote(note));
    console.log('--- Fin de la liste de notes ---');
  }else {
    console.log('Liste vide');
  }
}else if (command === 'read') { // node .\app.js read -t "Angular"
  //affiche la note passe en param
  var note = notes.getNote(argv.title);
  if(note) {
    notes.logNote(note);
  }else {
    console.log('Aucune note ce porte ce titre');
  }
}else if (command === 'remove') { // node .\app.js remove -t "Angular"
  var note = notes.remoteNote(argv.title);
  if (note){ // If ternaire
  var msg = note ? 'Note supprimée' :'Aucune note a supprimer avec ce titre'
  console.log(msg);
  }else {
    console.log('Note inexistante - Pas de suppression possible');
  }
}else if (command === 'update') { // node .\app.js update -t "Angular"
  var note = notes.updateBody(argv.title, argv.body);
  if (note){ 
  console.log('Voici votre nouvelle note');
  notes.logNote(note);
  }else {
  console.log('Note inexistante - Pas de modification possible');
  }
}else {
  console.log('Commande inconnue');
};
