import imgImage8 from "./c9d9ead4369bdec13806dd655ba00bba73b6deb6.png";
import imgPicture21 from "./b4eebfce99f050ddf2605bf673f8616ed04b7ca6.png";
import img48649671924117075458951084848704296260316064N1 from "./122608485635e846f39d10ad2694f59023f909dd.png";
import imgImage7 from "./833d158ae763c459812b242f17917a96b903e1d7.png";
import imgPicture32 from "./e8c226f0ce4ebb0e326ec38a4dee81fc142a5589.png";

function Frame() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute content-stretch flex flex-col gap-[27px] items-center justify-center leading-[0.9] left-1/2 text-[#0034e0] text-[62px] text-center top-[calc(50%-160.5px)] w-[806px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['General_Sans_Variable:Bold',sans-serif] font-bold relative shrink-0 w-full">THE WORLD AS A PARENT</p>
      <p className="font-['Centaur:Regular',sans-serif] not-italic relative shrink-0 w-full">by Yotam Rozin</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="-translate-x-1/2 [word-break:break-word] absolute content-stretch flex font-['General_Sans:Medium',sans-serif] gap-[208px] items-start leading-[0.9] left-1/2 not-italic text-[#0034e0] text-[25px] top-[44px] whitespace-nowrap">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 text-center">Writing Sample</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0">Letter of Endorsement</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 text-center">Creative Background</p>
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 text-center">{`CV & Links`}</p>
    </div>
  );
}

export default function Component01Hero() {
  return (
    <div className="bg-white relative size-full" data-name="01 - Hero">
      <Frame />
      <Frame1 />
      <div className="absolute h-[230px] left-[calc(50%+13px)] top-[1057px] w-[434px]" data-name="image 8">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage8} />
      </div>
      <div className="absolute h-[298px] left-[calc(41.67%+22px)] top-[691px] w-[589px]" data-name="Picture2 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPicture21} />
      </div>
      <div className="absolute h-[508px] left-[calc(75%+41px)] top-[555px] w-[347px]" data-name="486496719_2411707545895108_4848704296260316064_n 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img48649671924117075458951084848704296260316064N1} />
      </div>
      <div className="absolute h-[422px] left-[calc(25%+33px)] top-[865px] w-[276px]" data-name="image 7">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage7} />
      </div>
      <div className="absolute h-[429px] left-[102px] top-[560px] w-[328px]" data-name="Picture3 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPicture32} />
      </div>
    </div>
  );
}