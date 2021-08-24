let arrayIn = document.getElementsByClassName("array-input")[0],
    languageSelect = document.getElementsByClassName("language-select")[0],
    typeSelectObject = document.getElementsByClassName("type-select")[0],
    generateButton = document.getElementsByClassName("generate-button")[0],
    outputTextareaArray = document.getElementsByClassName("array-output")[0],
    varTypeSelectObject = document.getElementsByClassName("var-type-select")[0];

let inputs = [];
let currentSelectedLanguage = languageSelect.value;
let currentSelectedType = typeSelectObject.value;
let currentSelectedVarType = varTypeSelectObject.value;

let code = "";

arrayIn.addEventListener('change', () => {
    inputs.push(arrayIn.value);

    //#region creating the element
    let element = document.createElement("div");
    element.classList.add("input-element");

    let elementText = document.createElement("span");
    elementText.classList.add("input-element-text");
    elementText.innerText = arrayIn.value;

    let elementExitbutton = document.createElement("span");
    elementExitbutton.classList.add("input-element-delete-button");
    elementExitbutton.innerText = "X";

    elementExitbutton.addEventListener('click', () => {
        element.remove();
        inputs.splice(inputs.indexOf(arrayIn.value), 1);
    });

    element.appendChild(elementText);
    element.appendChild(elementExitbutton);
    document.getElementsByClassName("inputs-parent")[0].appendChild(element);

    //#endregion

    arrayIn.value = "";
});

languageSelect.addEventListener('change', () => currentSelectedLanguage = languageSelect.value);
typeSelectObject.addEventListener('change', () => {
    currentSelectedType = typeSelectObject.value;
});
varTypeSelectObject.addEventListener('change', () => currentSelectedVarType = varTypeSelectObject.value);

let Generate = () => {
    if (currentSelectedLanguage == "JS")
        GenerateJSArray();
    else if (currentSelectedLanguage = "C#")
        GenerateCSharpArray();
}

let GenerateJSArray = () => {
    let firstTime = true;

    if (currentSelectedType == "Declaratie") {
        let codeStringNow = "let array = [";

        inputs.forEach(input => {
            if (firstTime)
                if (currentSelectedVarType == "String")
                    codeStringNow += '"' + input + '"';
                else
                    codeStringNow += input;
            else
                if (currentSelectedVarType == "String")
                    codeStringNow += ", " + '"' + input + '"';
                else
                    codeStringNow += ", " + input;

            firstTime = false;
        });

        codeStringNow += "];";

        code = codeStringNow;

        outputTextareaArray.value = code;

        console.log(codeStringNow);
    } else if (currentSelectedType == "Dupa") {
        let codeStringNow2 = "let array = [];";

        inputs.forEach((input, i) => {
            if (currentSelectedVarType == "String")
                codeStringNow2 += "\n" + "array[" + i + "] = " + '"' + input + '"' + ";";
            else
                codeStringNow2 += "\n" + "array[" + i + "] = " + input + ";";
        });

        code = codeStringNow2;

        outputTextareaArray.value = code;

        console.log(codeStringNow2);
    }
}

generateButton.addEventListener('click', Generate);

let GenerateCSharpArray = () => {
    if (currentSelectedType == "Declaratie") {
        let firstTime = true;

        let codeStringNow3 = "string[] array = {";

        inputs.forEach(input => {
            if (currentSelectedVarType == "String")
                codeStringNow3 += firstTime ? '"' + input + '"' : ", " + '"' + input + '"';
            else
                codeStringNow3 += firstTime ? input : "," + input;
            firstTime = false;
        });

        codeStringNow3 += "};";

        code = codeStringNow3;
        outputTextareaArray.value = code;

        console.log(codeStringNow3);
    } else if (currentSelectedType == "Dupa") {
        let codeStringNow4 = (currentSelectedVarType == "String" || currentSelectedVarType == "Variabila") ? "string[] array;" : "int[] array";

        inputs.forEach((input, i) => {
            if (currentSelectedVarType == "String")
                codeStringNow4 += "\n" + "array[" + i + "] = " + '"' + input + '"' + ";";
            else
                codeStringNow4 += "\n" + "array[" + i + "] = " + input + ";";
        });

        code = codeStringNow4;
        outputTextareaArray.value = code;

        console.log(codeStringNow4);
    }
}