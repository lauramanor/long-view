function getFolder(band){
  band = band.toLowerCase();
  var id;
  if (band == "violet") {
    id = "1UeEkhAGiUIQ3jRrwtUiq1oNXSnRb1bWZ";
  } else if (band == "aqua") {
    id = "12N7GXsDGEv1wVOB2ZYC1BeqVf-Y_YXys";
  } else if (band == "sage") {
    id = "1AG54JeQAqKVTsgQljHLCp29hBBvVAOzX";
  } else if (band == "crimson") {
    id = "1ijym2_5PKADzkVzvU5XGpqD_a8N0ayBA";
  } else {
    // if band does not match one of the proper bands, then do not create a doc!
    return false;
  }

  return DriveApp.getFolderById(id);
}

function fillTemplate() {

 // Set year variable for the first slide
 var YEAR = "2022-2023";


 // Open the template using the ID 
 // Remember to replace this with the Id of your presentation
 var TEMPLATE = DriveApp.getFileById("10DK5jD4t9ASrom6ys8di0DFZtC5UMOixj3l_qjmoD08");
 var templateName = TEMPLATE.toString();


 // Read data from the spreadsheet
 var sheet = SpreadsheetApp.getActive()
 var values = sheet.getDataRange().getValues();

 // create count for keeping track and writing 
 var count = 0;

 // Replace template variables in the presentation with values
 values.forEach(function(row) {

   // increment count
   count++;

   // retrieve relevant information from sheet
   var studentName = row[0]; // First column contains student names
   var studentGrade = row[1]; // Second column contains values
   var band = row[2];
   var folder = getFolder(band);

   if (folder !== false){


      // Create a copy of the presentation using DriveApp
      var new_file = TEMPLATE.makeCopy();
      new_file.setName(studentName + " Transcript and Artifact Portfolio " + YEAR);

      // add new documetn to the correct folder
      folder.addFile(new_file)

      // Open in Slides app so we can access the text

      var new_doc = SlidesApp.openById(new_file.getId())


      new_doc.replaceAllText("{LearnerName}", studentName);
      new_doc.replaceAllText("{g#}", studentGrade);
      new_doc.replaceAllText("{year-range}", YEAR)

      var cell = sheet.getActiveSheet().getRange(count,4);
      cell.setValue("https://docs.google.com/presentation/d/" + new_doc.getId());

      console.log(studentName + "Transcript created " + new_doc.getId())


   }else if (count == 1){
     console.log("Skipping first row")
   } else {
     console.log("Bad band name - no folders with name '" + row[2] + "' exist!");
   }

   

    
 });

}