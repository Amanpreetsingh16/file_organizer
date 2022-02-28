//to take input from comand line
let inputarr = process.argv.slice(2);
//console.log(inputarr);

let fs = require("fs");
let path = require("path");

// node main.js tree "directorypath"
// node main.js organise "directorypath"
// node main.js help


let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'iso', 'gz', 'ar', 'xz'],



    documents: ['docx', 'doc', 'pdf', 'txt', 'png', 'pptx', 'odg', 'ods', 'xlsx'],



    app: ['exe', 'dmg', 'pkg', 'deb'],

}



let command = inputarr[0];
switch (command) {
    case "tree":
        treefn(inputarr[1]);
        break;

    case "organise":
        organisefn(inputarr[1]);
        break;

    case "help":
        helpfn();
        break;

    default:
        console.log("Input valid commands😎");
        break;


}
function treefn(dirpath) {
    console.log("Tree command implemented for", dirpath);

}

function organisefn(dirpath) {
    console.log("organise command implemented for", dirpath);
    // 1. input directory path which is given
    let destpath;

    if (dirpath == undefined) {

        console.log('kindly enter the path');
        return;
    } else {

        let doesexist = fs.existsSync(dirpath);

        if (doesexist) {

            //2. then create organized file name ki diretory given directory ma
            destpath = path.join(dirpath, "organized_files");
            if (fs.existsSync(destpath) == false) {
                fs.mkdirSync(destpath);

            }

        } else {
            console.log('kindly enter the vald path');
            return;



        }
    }




    organisehelper(dirpath, destpath);



}

function organisehelper(src, dest) {

    // 3. fir identify the categaries of ll the file present in that input directory
    let filename = fs.readdirSync(src);
    console.log(filename);
    for (let i = 0; i < filename.length; i++) {

        let fileaddress = path.join(src, filename[i]);
        let checkfile = fs.lstatSync(fileaddress).isFile();
        if (checkfile) {
            //console.log(filename[i]);
            let category = getcategory(filename[i]);
            console.log(filename[i], "belongs to >>", category)

            //4. copy/cut files to that organised directory inside of any catagory
            sendfiles(fileaddress, dest, category);

        }

    }

}


function sendfiles(srcfilepath, dest, category){

    let categorypath = path.join(dest, category);
    if(fs.existsSync(categorypath) == false){

        fs.mkdirSync(categorypath);

    }
    let filename =path.basename(srcfilepath);
    let destfilepath = path.join(category,filename);
    fs.copyFileSync(srcfilepath,destfilepath);
    console.log(filename,"copied to",category);
}

function getcategory(name) {

    let extension = path.extname(name);
    extension = extension.slice(1);
    console.log(extension);

    for (let type in types) {
        let ctypeArr = types[type];
        for (let i = 0; i < ctypeArr.length; i++) {
            if (extension == ctypeArr[i]) {
                return type;
            }


        }



    }
    return "others";
}

function sendfiles(srcfilepath, dest, category){

    let categorypath = path.join(dest, category);
    if(fs.existsSync(categorypath) == false){

        fs.mkdirSync(categorypath);

    }
    let filename =path.basename(srcfilepath);
    let destfilepath = path.join(category,filename);
    fs.copyFileSync(srcfilepath,destfilepath);
    console.log(filename,"copied to",category);
}


//help function implemented here 

function helpfn() {
    console.log(`
        List of all command:
        node main.js tree "directorypath"
        node main.js organise "directorypath"
        node main.js help
        `);

}
