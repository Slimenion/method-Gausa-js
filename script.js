$(document).ready(function () {
    $(window).bind("resize", resizeWindow);
    function resizeWindow(e) {
        var newWindowWidth = $(window).width();

        // Если ширина меньше 600 px, используется таблица стилей для мобильного
        if (newWindowWidth < 600) {
            $("link[rel=stylesheet]").attr({ href: "mobile.css" });
        } else if (newWindowWidth > 600) {
            // Если ширина больше 600 px, используется таблица стилей для десктопа
            $("link[rel=stylesheet]").attr({ href: "style.css" });
        }
    }
});

var B = [];
var A = [];

function StandartMatr(B) {
    var k = -1;
    for (var i = 0; i < A.length - 1; i++) {
        if (B[i][i] == 0 && (B[i - 1][i] == undefined || B[i - 1][i] == 0)) {
            if (i + 1 < A.length) {
                for (var j = i + 1; j < A.length; j++) {
                    if (B[j][i] != 0 && B[i][j] != 0) k = j;
                }
            }
        }
        if (k != -1) {
            for (var a = 0; a < B.length + 1; a++) {
                var swipe;
                swipe = B[i][a];
                B[i][a] = B[k][a];
                B[k][a] = swipe;
            }
            k = -1;
        }
    }
}

function Determinant(A) {
    var n = A.length,
        subA = [],
        detA = 0;

    if (n == 1) return A[0][0];
    if (n == 2) return A[0][0] * A[1][1] - A[0][1] * A[1][0];
    if (n == 3) {
        return (
            A[0][0] * A[1][1] * A[2][2] +
            A[0][1] * A[1][2] * A[2][0] +
            A[0][2] * A[1][0] * A[2][1] -
            (A[0][0] * A[1][2] * A[2][1] +
                A[0][1] * A[1][0] * A[2][2] +
                A[0][2] * A[1][1] * A[2][0])
        );
    }

    for (var i = 0; i < n; i++) {
        for (var h = 0; h < n - 1; h++) subA[h] = [];
        for (var a = 1; a < n; a++) {
            for (var b = 0; b < n; b++) {
                if (b < i) subA[a - 1][b] = A[a][b];
                else if (b > i) subA[a - 1][b - 1] = A[a][b];
            }
        }
        var sign = i % 2 == 0 ? 1 : -1;
        detA += sign * A[0][i] * Determinant(subA);
    }

    return detA;
}

function print(matr) {
    for (var i = 0; i < matr.length; i++) {
        for (var j = 0; j < matr[i].length; j++) {
            console.log(matr[i][j] + " ");
        }
        console.log("\n");
    }
}

function MethodGausa(B) {
    for (var i = 0; i < B.length; i++) {
        A[i] = [];
        for (var j = 0; j < B[i].length - 1; j++) {
            A[i][j] = B[i][j];
        }
    }
    StandartMatr(B);
    if (Determinant(A) == 0) {
        return 0;
    } else {
        var currentI = 0,
            currentIAdd = 1,
            currentEl1,
            currentEl2;
        for (var currentI = 0; currentI < B.length; currentI++) {
            for (
                currentIAdd = 1;
                currentIAdd < B.length - currentI;
                currentIAdd++
            ) {
                currentEl1 = B[currentI][currentI];
                currentEl2 = B[currentI + currentIAdd][currentI];
                if (currentEl2 != 0) {
                    for (var j = currentI; j < B[currentI].length; j++) {
                        B[currentI][j] *= currentEl2;
                        B[currentI + currentIAdd][j] *= currentEl1;
                        B[currentI + currentIAdd][j] -= B[currentI][j];
                    }
                }
            }
        }
        return B;
    }
}

function FindX(B) {
    if (MethodGausa(B) != 0) {
        var answers = [],
            lastElem;
        lastElem = A.length + 1;
        for (var i = 0; i < A.length; i++) {
            answers[i] = 1;
        }
        for (var i = A.length - 1; i > -1; i--) {
            var sum = 0,
                lastElem = A.length;
            for (var j = 0; j < A.length; j++) {
                if (j != i) {
                    if (i == A.length - 1) {
                        sum += B[i][j] * answers[j];
                    } else {
                        sum += B[i][j] * answers[j];
                    }
                }
            }
            answers[i] = (-sum + B[i][lastElem]) / B[i][i];
        }
        return answers;
    } else {
        return "Либо решений не существует, либо их бесконечное множество.";
    }
}

//------------------------------------------------------------------------------------код для страницы

function delete3Last(classId1, classId2, classId3) {
    //уничтожение предыдущего блока
    var $delete1 = $(classId1);
    var $delete2 = $(classId2);
    var $delete3 = $(classId3);
    $delete1.detach();
    $delete2.detach();
    $delete3.detach();
}

function addNewElement(newElem, classIdWhereAdded) {
    var $elem = $(newElem);
    $elem.appendTo(classIdWhereAdded);
}

function createInputMatrix(sizeMatrix) {
    sizeMatrix;
    var $newMatrix = '<div class="newMatrix">';
    for (var i = 0; i < sizeMatrix; i++) {
        $newMatrix = $newMatrix + '<div class = "lineMatrix"> ';
        for (var j = 0; j <= sizeMatrix; j++) {
            if (i == 0) {
                if (j != sizeMatrix) {
                    $newMatrix =
                        $newMatrix +
                        `<div class="tittleMatrix">
                                                <p>x` +
                        j +
                        `</p>` +
                        '<input type="text" class = "matrixCell" id="size' +
                        sizeMatrix +
                        "x" +
                        sizeMatrix +
                        "_" +
                        i +
                        "_" +
                        j +
                        '"/>' +
                        "</div>";
                } else {
                    $newMatrix =
                        $newMatrix +
                        `<div class="tittleMatrix">
                                                <p>f(xi)` +
                        `</p>` +
                        '<input type="text" class = "matrixCell" id="size' +
                        sizeMatrix +
                        "x" +
                        sizeMatrix +
                        "_" +
                        i +
                        "_" +
                        j +
                        '"/>' +
                        "</div>";
                }
            } else {
                $newMatrix =
                    $newMatrix +
                    ' <input type="text" class = "matrixCell" id="size' +
                    sizeMatrix +
                    "x" +
                    sizeMatrix +
                    "_" +
                    i +
                    "_" +
                    j +
                    '"/>';
            }
        }
        $newMatrix = $newMatrix + " </div>";
    }
    $newMatrix = $newMatrix + "</div>";
    return $newMatrix;
}

$("#sizeMatrixButton").click(function () {
    if (
        $("#sizeMatrix").val() == "Выбрать свой вариант" &&
        !$("#CustomSizeInput").length
    ) {
        delete3Last(".CustomSize", ".newMatrix", ".lineX");
        addNewElement(
            `<div class = "CustomSize">
                <input type="text" id="CustomSizeInput" />
            </div>`,
            ".Custom"
        );
    } else if (
        $("#sizeMatrix").val() == "Выбрать свой вариант" &&
        $("#CustomSizeInput").length
    ) {
        delete3Last(".none", ".newMatrix", ".lineX");
        $newMatrix = createInputMatrix(+$("#CustomSizeInput").val());
        addNewElement($newMatrix, ".Matrix");
    } else {
        delete3Last(".CustomSize", ".newMatrix", ".lineX");
        $newMatrix = createInputMatrix($("#sizeMatrix").val().split("x")[0]);
        addNewElement($newMatrix, ".Matrix");
    }
});

$("#calculateButton").click(function () {
    var $sizeMatrix = $("#sizeMatrix").val().split("x");
    for (var i = 0; i < $sizeMatrix[0]; i++) {
        B[i] = [];
        for (var j = 0; j <= $sizeMatrix[0]; j++) {
            B[i][j] = +$(
                "#size" +
                    $sizeMatrix[0] +
                    "x" +
                    $sizeMatrix[0] +
                    "_" +
                    i +
                    "_" +
                    j
            ).val();
        }
    }
    if (
        FindX(B) == "Либо решений не существует, либо их бесконечное множество."
    ) {
        var $answer = $(`<div class="answer"><p>` + FindX(B) + `</p></div>`);
        $answer.appendTo(".matrixCalc");
    } else {
        var $answer = $(FindX(B));
        var $myNewElement = [];
        var $totalAnswer = `<div class="answer">`;
        for (var i = 0; i < B.length; i++) {
            $myNewElement[i] = "<p> x" + i + " = " + $answer[i] + "</p>";
        }
        for (var i = 0; i < B.length; i++) {
            $totalAnswer = $totalAnswer + $myNewElement[i];
        }
        $totalAnswer = $totalAnswer + "</div>";
        $totalAnswer = $($totalAnswer);
        $totalAnswer.appendTo(".matrixCalc");
    }
    B = [];
});
