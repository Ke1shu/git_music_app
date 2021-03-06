// 前、次ボタンの非表示
document.getElementById("btngroup").style.visibility ="hidden";


let page = 0;
let link = [];

function linkbtn(index) {
    navigator.clipboard.writeText(link[index]).then(e => {
        alert('コピーできました');
      });
}

function shokika(){
        link = [];

        // tbodyの取得
        var tbody = document.getElementById("tbody");
        //要素があれば削除する、なければ作る,初期化
        if(tbody){
            tbody.remove()
            var tbody = document.createElement('tbody');
            tbody.id = 'tbody';
    
            // 作成したtbodey要素をinfo_table要素に追加する
            var info_table = document.getElementById('info_table');
            info_table.appendChild(tbody);
        }else{
            var tbody = document.createElement('tbody');
            tbody.id = 'tbody';
    
            // 作成したtbodey要素をinfo_table要素に追加する
            var info_table = document.getElementById('info_table');
            info_table.appendChild(tbody);
        }
}

async function run(key,no) {
    data = await eel.music_search(key,no)();

    shokika();
    link=[];

    // dataの数だけfor文
    for (let i = 0; i < data['data']['items'].length; i++) {
        // tr要素を作成
        var tr = document.createElement('tr'); 
        tr.id = "tr"+i // idにtr#とつける
        
        // tbodyへtrを追加
        tbody.appendChild(tr);
    
        // tdの作成、artist、title、URL
        for(let j = 0; j<3; j++){

            if(j==0){
                var koumoku　= 'artist'
            }else if(j==1){
                var koumoku = 'title'
            }else{
                var koumoku = 'url'
            }

            // td要素を作成
            var td = document.createElement('td');
            td.textContent = data['data']['items'][i][koumoku];

            // tdをtr#の中に入れる

            //var tr = document.getElementById('tr#');
            eval("var tr = document.getElementById('tr"+ i +"');");

            if(j==2){

                link.push(data['data']['items'][i][koumoku]);
                td.textContent = '';
                tr.appendChild(td);

                // 最後の子要素を取得 
                var lasttd = tr.lastElementChild ; 
                // aタグ作成
                var a_element = document.createElement('a');
                a_element.textContent = 'Copy'
                a_element.href = 'javascript:linkbtn('+i+');'
                lasttd.appendChild(a_element);
            }else{
                tr.appendChild(td);
            }
            
            

        }

    }

}

function kensaku() {
    // ボタンの表示
    document.getElementById("btngroup").style.visibility ="visible";

    page = 0;
    let keywords = document.getElementById("keywords").value;
    run(keywords,page);
}

function mae() {
    page-=1;
    let keywords = document.getElementById("keywords").value;
    run(keywords,page);
}

function tsugi() {
    page+=1;
    let keywords = document.getElementById("keywords").value;
    run(keywords,page);
}

