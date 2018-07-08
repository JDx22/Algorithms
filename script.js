

class Box {
    constructor(boxSize) {
        this.boxSize = Number(boxSize);
    }
    render() {
        let div=document.createElement('div');
        div.style.width = this.boxSize;
        div.style.height = this.boxSize;
        div.style.backgroundColor = "rgb(255, 0, 0)";
        document.getElementById("box-container").appendChild(div);
    }
    isBiggerThen(other) {
       if (other instanceof Box)
       {
            return this.boxSize>other.boxSize;
       } else 
       {
           throw "other of isBiggerThen(other) not Box"
       }
    }

}
class BoxArray {
    constructor() {
        this.boxArray = [];
    }
    addBox(box) {
        if(box instanceof Box) {
            this.boxArray.push(box);
        } else {
            throw "not instance of box";
        }
    }
    _merge(startIndex,middleIndex,endIndex) {
        let results=[];
        for (var i=0 , ii=0 , firstHalfLength=middleIndex-startIndex, secondHalfLength=endIndex-middleIndex;  i<firstHalfLength || ii<secondHalfLength ;  ) {
            while ( i===firstHalfLength && ii<secondHalfLength) {
                results.push( this.boxArray[middleIndex+ii]);
                ii++;
            }
            while (ii === secondHalfLength && i<firstHalfLength) {
                results.push(  this.boxArray[startIndex+i]);
                i++
            }
            if (i<firstHalfLength && ii<secondHalfLength) {
                if (this.boxArray[startIndex+i].isBiggerThen(this.boxArray[middleIndex+ii])) {
                    results.push(this.boxArray[middleIndex+ii])
                    ii++;
                } else {
                    results.push(this.boxArray[startIndex+i]);
                    i++;


                }
            } 
        }
        for (i=0 ; i<endIndex-startIndex ; i++) {
            this.boxArray[startIndex+i] = results[i];
        }
        
    }
    mergeSort(startIndex,endIndex) {
        let arrayLength = endIndex-startIndex;
        if ( arrayLength <= 1) {
            return ;
        } else {  // [1,6,8,9] [2,3,4,6]
            let half = Math.trunc(arrayLength/2); 
            let middleIndex = startIndex+half;
            this.mergeSort(startIndex,middleIndex);
            this.mergeSort(middleIndex,endIndex);
            this._merge(startIndex,middleIndex,endIndex);
        }  
    }
    sort(sortMethod) {
        
        this.mergeSort(0,this.boxArray.length);
        
    }
     
    render() {
        let myNode=document.getElementById('box-container');
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
        this.boxArray.forEach(box => box.render());
    }

}
document.getElementById('sort').onclick = function (event) {
    app.sort();
    app.render();
}
document.getElementById('add').onclick = function (event) {
    let boxSize=document.getElementById('input-box-size').value;
    let b = new Box(boxSize);
    app.addBox(b);
    app.render();
    
}

let app = new BoxArray();

