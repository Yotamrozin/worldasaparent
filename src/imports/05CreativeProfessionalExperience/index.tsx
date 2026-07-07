import imgRectangle3 from "./457d3a026c6f4f926c53c172c1126df6517cb873.png";

function Frame() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute content-stretch flex flex-col gap-[27px] items-center justify-center leading-[0.9] left-1/2 text-[#0034e0] text-[62px] text-center top-[calc(50%+430px)] w-[806px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-['General_Sans_Variable:Bold',sans-serif] font-bold relative shrink-0 w-full">THE WORLD AS A PARENT</p>
      <p className="font-['Centaur:Regular',sans-serif] not-italic relative shrink-0 w-full">by Yotam Rozin</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[#0034e0] content-stretch flex flex-col h-[86px] items-center justify-center pb-[34px] pl-[71px] pr-[69px] pt-[35px] relative rounded-[33.468px] shrink-0 w-[373px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['General_Sans_Variable:Semibold',sans-serif] font-semibold leading-[1.2] relative shrink-0 text-[32px] text-white whitespace-nowrap" dir="auto">
        Visit My Website
      </p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col h-[86px] items-center justify-center pb-[34px] pl-[71px] pr-[69px] pt-[35px] relative rounded-[33.468px] shrink-0 w-[373px]">
      <div aria-hidden className="absolute border-[#0034e0] border-[6.085px] border-solid inset-0 pointer-events-none rounded-[33.468px]" />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['General_Sans_Variable:Semibold',sans-serif] font-semibold leading-[1.2] relative shrink-0 text-[#0034e0] text-[32px] text-center whitespace-nowrap" dir="auto">
        Download CV
      </p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[20px] h-[96px] items-center relative shrink-0">
      <Frame3 />
      <Frame4 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[52px] items-start left-[calc(58.33%-22px)] top-[287px] w-[772px]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['General_Sans_Variable:Medium',sans-serif] font-medium h-[327px] leading-[1.2] min-w-full relative shrink-0 text-[#0034e0] text-[32px] w-[min-content]">Alongside my artistic practice, I work as an independent multidisciplinary designer and creative lead. I manage projects from initial strategy through to final delivery, overseeing timelines, budgets, and project scope while designing brands, websites, motion graphics, and digital experiences. My work combines creative direction, systems thinking, and hands-on design to deliver cohesive and impactful outcomes for clients.</p>
      <Frame2 />
    </div>
  );
}

export default function Component05CreativeProfessionalExperience() {
  return (
    <div className="bg-white relative size-full" data-name="05 - Creative Professional Experience">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] absolute font-['General_Sans_Variable:Semibold',sans-serif] font-semibold leading-[1.2] left-[calc(50%-904px)] text-[#0034e0] text-[62px] top-[119px] w-[1809px]">Creative Professional Experience</p>
      <p className="-translate-x-1/2 [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] absolute font-['General_Sans_Variable:Semibold',sans-serif] font-semibold leading-[1.2] left-[calc(50%+0.5px)] text-[#0034e0] text-[42px] text-center top-[1096px] w-[1809px]">Thank you for your time!</p>
      <Frame />
      <div className="absolute h-[563px] left-[56px] rounded-[44px] top-[243px] w-[992px]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[44px]">
          <img alt="" className="absolute h-full left-[-0.05%] max-w-none top-0 w-[100.1%]" src={imgRectangle3} />
        </div>
      </div>
      <div className="absolute left-[calc(41.67%+109px)] size-[102px] top-[1535px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 102 102">
          <circle cx="51" cy="51" id="Ellipse 1" r="49.5" stroke="var(--stroke-0, #0034E0)" strokeWidth="3" />
        </svg>
      </div>
      <Frame1 />
    </div>
  );
}