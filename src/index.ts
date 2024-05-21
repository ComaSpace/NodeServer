import http from 'http';

//Sukuriame f-ją kuri bus paleista tuomet kai atkeliaus užklausa iš vartotojo
const server=http.createServer((req,res)=>{

    //Vartotojo nuoroda
    const url=req.url;
    console.log(url);

    //Pasiimti metodą
    const method=req.method;
    console.log(method);

    //Daugiklio paemimas
    let daugiklis=1;
    if (url!=null){
       daugiklis=parseInt(url.split("/")[1]);
    }
    

    //Išsiunčiame vartotojui kokie duomenys yra persiunčiami
    res.setHeader('Content-Type','text/html; charset=utf-8');
    
    //Siunčiamas dokumentas
    res.write("<!DOCTYPE html>");
    res.write("<html>");

    res.write("<head>");
    res.write("<title>Daugybos lentelė</title>");
    res.write("</head>");
    res.write("<body>");

    for(let i=1; i<=10; i++){
        res.write(`<a href="/${i}">${i}</a>&nbsp;&nbsp;`);
    }
    res.write("<hr>");
    res.write(`<h1>${daugiklis} daugybos lentelė</h1>`);
    res.write("<table border='1'>");
    
    for (let i=1; i<=10; i++){
        res.write("<tr>");
        res.write(`<td>${i}</td><td>*</td><td>${daugiklis}</td><td>=</td><td>${i*daugiklis}</td>`);
        res.write("</tr>");
    }

/*
    for (let i=1; i<=10; i++){
        res.write("<tr>");
        for (let y=1; y<=10; y++){
            if (i==5 && y==4){
                res.write("<td></td>");
            }else{
                res.write(`<td>${i*y}</td>`);
            }
        
        }
        res.write("</tr>");
    }
*/
    res.write("</table>");

    res.write("</body>");
    res.write("</html>");
    res.end();

});

server.listen(2999, 'localhost');