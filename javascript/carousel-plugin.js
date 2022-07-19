function Carousel(...frames){
    let framesCount = 0, 
    slidesCount = 0;
    currentSlideRef = 1,
    containerListenerCounter=0;

    this.initialize = function(){
        framesCount = frames.length;
        for(let frame of frames){
            frame['refNode'] = document.querySelectorAll(frame['id'])[0];
            frame['sliderNodeRef'] = frame['refNode'].children;
            frame['clonedDetails'] = cloneNAppendNode(frame['refNode'], frame['sliderNodeRef'], frame['cloneName']);
            frame['frameWidth'] = getSliderContainerWidth(frame['sliderNodeRef'][0]);
            frame['refNode'].style.transform = `translateX(${-frame['frameWidth']}px)`;
            attachEventListener(frame['refNode'],frame['slides'], frame['clonedDetails'], frame['frameWidth']);
        }
        slidesCount = frames[0]['sliderNodeRef'].length;
    }

    function cloneNAppendNode(parentNode, childElements, cloneName){
        const firstClone = childElements[0].cloneNode(true);
        const lastClone = childElements[childElements.length - 1].cloneNode(true)
        firstClone.id= cloneName + '-first-clone';
        lastClone.id= cloneName + '-last-clone';
        parentNode.append(firstClone);
        parentNode.prepend(lastClone);
        return {firstCloneId: firstClone.id, lastCloneId: lastClone.id}
    }

    function getSliderContainerWidth(frame){
        return frame.getBoundingClientRect().width;
    }


    const getSlides = (selector) => document.querySelectorAll(selector);

    function attachEventListener(
        frame,
        slidesRef,
        { firstCloneId, lastCloneId },
        slidesWidth
    ){
        frame.addEventListener("transitionend", () => {
            const slidesArr = getSlides(slidesRef);
            containerListenerCounter += 1;
            let tempIndex = currentSlideRef;
            if (slidesArr[currentSlideRef].id === firstCloneId) {
              frame.style.transition = "none";
              tempIndex = 1;
              if (containerListenerCounter === framesCount) {
                currentSlideRef = 1;
              }
              frame.style.transform = `translateX(${-slidesWidth * tempIndex}px)`;
            }
        
            if (slidesArr[currentSlideRef].id === lastCloneId) {
              frame.style.transition = "none";
              tempIndex = slidesArr.length - 2
              if ((containerListenerCounter === framesCount)) {
                currentSlideRef = slidesArr.length - 2;
              }
              frame.style.transform = `translateX(${-slidesWidth * tempIndex}px)`;
            }
        
            if (containerListenerCounter === framesCount) {
              containerListenerCounter = 0;
            }
          });
    }

    this.loadNextSlide = function(){
        if (currentSlideRef >= slidesCount - 1) return;
        currentSlideRef++;
        for(let frame of frames){         
            frame['refNode'].style.transition = ".5s ease-in-out";   
            frame['refNode'].style.transform = `translateX(${-frame['frameWidth'] * currentSlideRef}px)`;
        }
    }
    
    this.loadPreviousSlide=function(){
        if (currentSlideRef <= 0) return;
            currentSlideRef--;
        for(let frame of frames){         
            frame['refNode'].style.transition = ".5s ease-in-out";   
            frame['refNode'].style.transform = `translateX(${-frame['frameWidth'] * currentSlideRef}px)`;
        }
    }
    
}