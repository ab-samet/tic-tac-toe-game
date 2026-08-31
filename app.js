const cells = document.querySelectorAll(".cell")
const titleHeader = document.querySelector("#titleHeader")
const xPlayerDisplay = document.querySelector("#xPlayerDisplay")
const oPlayerDisplay = document.querySelector("#oPlayerDisplay")
const restartBtn = document.querySelector("#restartBtn")

// Oyun durumunu tutan degiskenler
let player = "X"
let isPauseGame = false // oyun duraklatılmıs mı?
let isGameStart = false //oyunda henuz bir hamle yapıldı mı?

// Kazanma durumlarında array, bu array kısmı 3x3 tahtanın js tarafındaki karsiligi
// HTML ekranda ne oldugunu gosterirken, inputCells JS'in oyundaki durumu hatırlamasını saglayacak.
const inputCells = ["", "", "",
                    "", "", "",          
                    "", "", "",]

// oyunu kazanma ihtimalleri
const winConditions = [
    [0,1,2], [3,4,5], [6,7,8], //Rows
    [0,3,6], [1,4,7], [2,5,8], //Columns
    [0,4,8], [2,4,6] //Diagonals
]

// Her hucreye click event listener eklenmesi
cells.forEach((cell, index) =>{
    cell.addEventListener("click", () => tapCell(cell, index))
})

// Hucreye tiklandiginda calisir
function tapCell(cell, index){

    // hucre boşsa ve oyun devam ediyorsa iceri gir oyunu baslat
    if (cell.textContent == "" && 
        !isPauseGame
    ){
        isGameStart = true // ilk hamle yapıldıgı için oyun basladi
        updateCell(cell, index)
    }
}

// hamleyi hucreye ve inputCells arrayine kaydeder
function updateCell(cell, index){

    cell.textContent = player
    inputCells[index] = player

    //her son hamlede kazanma veya beraberlik durumunu kontrol et
    checkWinner()

    // oyun bitmediyse sıradaki oyuncuya gec
    if (!isPauseGame){

    player = player === "X" ? "O" : "X" //ternary op. X ise O yap, O ise X yap.

    // ekrandaki aktif oyuncuyu degistir
    changePlayer()

    }


}

// sırası gelen ouyuncunun aktif olmasını saglar
function changePlayer(){
    if (player === "X"){

        xPlayerDisplay.classList.add("player-active")
        oPlayerDisplay.classList.remove("player-active")

    } else {

        xPlayerDisplay.classList.remove("player-active")
        oPlayerDisplay.classList.add("player-active")
    }
}

// kazanan ve/veya beraberlik durumunu kontrol eder
function checkWinner(){

    let winner = false // baslangicta henuz kazanan yok

    // Tüm kazanma ihtimallerini tek tek kontrol et
    winConditions.forEach((condition) =>{

        const [a,b,c] = condition // kazanma kosulundaki 3 indexi al

        // Üç hücre de dolu ve aynı oyuncuya mı ait?
        if(
            inputCells[a] &&
            inputCells[a] === inputCells[b] &&
            inputCells[a] === inputCells[c]
        ){
            titleHeader.textContent = `${inputCells[a]} Kazandı!`

            isPauseGame = true
            winner = true
        } 
        
    })

    // tüm hücreler dolu ve kazanan yoksa berabere
          if (!winner && !inputCells.includes("")) {
            titleHeader.textContent = "Berabere!"

            isPauseGame = true
        }
}

// Restart butonuna tıklandığında hücreler sıfırlanır ve oyun yeniden başlar
restartBtn.addEventListener("click", restartGame)

// oyunu baslangic durumuna getirir
function restartGame(){

    inputCells.fill("") //inputCells arrayindeki tüm hucreyi temizle

    // html'deki tüm hucreyi temizle
    cells.forEach((cell)=> {
        cell.textContent = ""
    })

    player = "X" // oyun yeniden basladıüında sıra X'te olacak sekilde ayarlandı

    isPauseGame = false
    isGameStart = false

    //baslangıctaki "Seçiniz" yazısı
    titleHeader.innerHTML = `Seçiniz <br><span class="span">👈👉</span>`

    // X'i aktif, O'yu pasif yap
    xPlayerDisplay.classList.add("player-active")
    oPlayerDisplay.classList.remove("player-active")

}

// Oyuncu x'i secmesi için
xPlayerDisplay.addEventListener("click", ()=>{
    
    if (!isGameStart){
    
    player = "X"
    changePlayer()

    }
})

// oyuncu o'yu secmesi icin
oPlayerDisplay.addEventListener("click", ()=>{
    
    if(!isGameStart){

    player = "O"
    changePlayer()

    }
})
