// window.onload = function(){

// /*
//    Hieronder de Download microinteractie, helemaal zelf gemaakt alleen info over de setup om te kunnen tekenen op de canvas
//    en hoe je een circel geraadpleegd op https://www.w3schools.com/tags/canvas_arc.asp
// */



// //
// //    var downloadButton = document.querySelector(".download");
// //    downloadButton.addEventListener("click", startDownload);
// //
// //    var timesClicked = 0;
// //    var counter = 0,
// //    counterDisplay = document.querySelector(".counter");
// //    counterDisplay.textContent = "Download";
// //
// //    function startDownload(){
// //       console.log("startDownload");
// //
// //       counterDisplay.textContent = "Download";
// //
// //       timesClicked++;
// //
// //       function circleUp(){
// //
// //             if(counter < 100){
// //                counter++;
// //                counterDisplay.textContent = counter + "%";
// //             }
// //
// //             if (counter == 100){
// //                downloadButton.classList.add("active");
// //                counterDisplay.textContent = "Verwijder";
// //                clearInterval(intervalID);
// //             }
// //          }
// //       }
// //
// //       if(timesClicked % 2 == 0){
// //          console.log("haha");
// //          clearInterval(intervalID);
// //          counter = 0;
// //          counterDisplay.textContent = "Download";
// //          downloadButton.classList.remove("active");
// //       }
// //
// //       else{
// //          var intervalID = setInterval(circleUp, 200);
// //       }
// //
// // };
// //
// //










   // var button = document.querySelectorAll(".download");
   // var downloadButton = document.querySelectorAll("canvas");
   // downloadButton.forEach((elem)=>{
   //    elem.addEventListener("click", startDownload);
   // })

   /* 
         Eerst wilde ik erachter komen hoe ik eventlisteners kon plaatsen op alle knoppen.
         Met een querySelectorAll ontving ik een nodelist. Een nodelist heeft geen foreach method.
         Maar je kunt wel Array.from(nodelist).forEach(...) gebruiken. Zo kun je alsnog de method van de array toepassen
         op de nodelist. Maar dat was niet de ideale manier.

         Joost kwam met de tip event delegation te gebruiken. Dus daarin heb ik mij verdiept.
         Nu pas ik een eventlistener toe op de parent van alle articles. Als er ergens binnen die parent wordt geklikt,
         kan ik de target achterhalen. De tagname van de het elemtent maak ik in een if statement lowercase en dan vergelijk ik
         die met "button". Op basis daarvan call ik de function startDownload met het element als argument.
         
         downloaded is een array lege array die ik opvul met de id's van de verhalen op het moment dat deze worden gedownload.
         Op het moment dat iemand nogmaals klikt op hetzelfde element, zoek ik de id in de array en slice ik die eruit.
         
         downloads daarintegen fungeert alleen om het totaal aantal downloads te tellen zodat ik deze kan weergeven bij de
         link naar de download pagina.

         Het enige waar ik geen aandacht aan heb besteed is dat JS single threated is. Je kunt niet 2 verhalen tegelijkertijd
         downloaden. 
   */

   if(document.querySelector("#bekende-personen .horizontal-scroll")){
      var articleParent = document.querySelector("#bekende-personen .horizontal-scroll");
      // var timesClicked = 0;
      var modal = document.querySelector("dialog");
      var button = document.querySelector("dialog button");
      var heading = modal.querySelector("header h2");
      modal.addEventListener("webkitAnimationEnd", function(e){
         if (e.animationName == "close"){
            // modal.classList.remove("active");
            modal.removeAttribute("class");
            modal.open = false;
            button.classList.remove("active")
         }
      })

      button.addEventListener("webkitAnimationEnd", function(e){
         if (e.animationName == "test"){
            console.log("sorryyy")
            // modal.classList.remove("active");
            // modal.removeAttribute("class");
            // modal.open = false;
            // modal.classList.remove("active")
            modal.classList.add("close")
         }
      })
      
      articleParent.addEventListener('click', (e)=>{
         // e.stopPropagation();
         var element = e.target;
         console.log(element)
         if(element.tagName.toLowerCase() == "button"){
            // element.addEventListener('click', startDownload);

            startDownload(element, button);
            // element.click(); fd
            console.log('fef');
         }
      })
      var downloads = 1;
      var downloaded = [];
      var note = document.querySelectorAll('li a span[data-display="counter"]');
      function startDownload(target, button){
         

         console.log(`${target.id} ${this}  test`);
         var counter = 0;

         function circleUp(target, button){

            target.classList.add("succeed");
            button.classList.add("intermediate");
            heading.textContent = target.id[0].toUpperCase() + target.id.slice(1);
            // console.log("haahaha")
   
            var timer = setInterval(function(){
               counter++;
               // console.log('fwefwef')
               console.log(counter)

               if (counter == 100){
                  clearInterval(timer);
                  console.log("hahahahaha")
                  button.classList.remove("intermediate");
                  button.classList.add("active");
                  // counterDisplay.textContent = "Verwijder";
               }
            }, 20);

         }

         if(downloaded.includes(target.id)){
            
            target.classList.remove("active");
            target.classList.remove("intermediate");
            target.classList.remove("succeed")

            var index = downloaded.indexOf(target.id);
            downloaded.splice(index, 1);
            console.log("count = " + downloaded.length)

            if(downloaded.length == 0){
               console.log("empty")
               note.forEach((elem)=>{
                  elem.classList.remove("counter");
               })
            }else{
               
               downloads = downloaded.length;
               note.forEach((elem)=>{
                  elem.textContent = String(downloads);
               })
            }
         
            console.log("if "+ downloaded);  
         }
         else{
            modal.open= true;
            modal.classList.add("active")

            circleUp(target, button);
            downloaded.push(target.id);
            downloads = downloaded.length;
            console.log('else '+ downloaded);

            note.forEach((elem)=>{
               setTimeout(()=>{
                  console.log("shit")
                     elem.classList.add("counter");
                     elem.textContent = String(downloads);
                  }, 3300)
            })
         }
      }


   };


   if(document.querySelector(".cube")){
      console.log("efefe")
      var cube = document.querySelector(".cube")

      var controls = document.querySelector(".controls");
      var control = document.querySelector(".control");
      var scene = document.querySelector(".scene");

      var count = 0;
      controls.addEventListener("click", function(e){
         count++;

         if(count == 1){
            control.classList.remove("end");
            scene.classList.remove("background")
            control.textContent = '^'
            cube.classList.remove("right")
            cube.classList.add("left")
         }else if(count == 2){
            control.textContent = '>'
            cube.classList.remove("left")
            cube.classList.add("top")
         }else{
            count = 0;
            control.textContent = '';
            control.classList.add("end");
            cube.classList.remove("top");
            scene.classList.add("background")
         }
         
      })



      // var right = document.querySelector('.cube__face--left');
      // var left = document.querySelector('.cube__face--back');
      // var top = document.querySelector('.cube__face--top');

      // cube.addEventListener("click", function(e){
      //    console.log(e.target.className.split(" ")[1].split("--")[1]);
      //    var element = e.target.className.split(" ")[1].split("--")[1];

      //    if(element === "left"){
      //       cube.classList.add("left")
      //    }else if(element === "right"){
      //       cube.classList.add("left")
      //    }else if(element === "top"){
      //       cube.classList.add("top")
      //    }else{
      //       console.log("naha")
      //    }
      // })

      // right.addEventListener("click", (e)=>{
      //    cube.removeAttribute("class")
      //    cube.classList.add("left");
      // })

      // left.addEventListener("click", (e)=>{
      //    cube.removeAttribute("class")
      //    cube.classList.add("right");
      // })





   }

   //rating

   if(document.querySelector("#rating")){
      var rating = document.querySelector("#rating");

      rating.addEventListener("click", function(e){
         
         var target = e.target;
         var id = null;
         console.log(target.tagName)
         var verhalen = document.querySelectorAll("#gerelateerde-verhalen article");
         var wrapper = document.querySelector("#gerelateerde-verhalen");

         if(target.tagName.toLowerCase() == 'input'){
            console.log("yes")
            id = target.dataset.rating;
            verhalen.forEach((elem)=>{
               elem.classList.remove("hide");
            })
            var filtered = Array.from(verhalen).filter(function(elem){
               return elem.dataset.rating !== id;
            });
            
            filtered.forEach((elem)=>{
               elem.classList.add("hide");
            })
            wrapper.classList.add("slide")


         }




      })

   }

   // if(document.querySelector(".back-home")){
   //    var backhome = document.querySelector(".back-home");

   //    backhome.addEventListener("click", function(e){
   //       window.location.href = 'file:///D:/stolp/Documents/School/Jaar%203/Herkansingsvakken/Vormgeving/live/western.html/';
   //    })
   // }


// }