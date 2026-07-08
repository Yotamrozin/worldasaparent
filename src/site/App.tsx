"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Lenis from "lenis";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "motion/react";
import { X, ArrowUp, Play } from "lucide-react";

// Static assets live in /public/imports and are referenced by URL path.
// Hero images
const heroImg8 = "/imports/01Hero/c9d9ead4369bdec13806dd655ba00bba73b6deb6.png";
const heroPicture21 = "/imports/01Hero/b4eebfce99f050ddf2605bf673f8616ed04b7ca6.png";
const heroPhoto = "/imports/01Hero/122608485635e846f39d10ad2694f59023f909dd.png";
const heroImg7 = "/imports/01Hero/833d158ae763c459812b242f17917a96b903e1d7.png";
const heroPicture32 = "/imports/01Hero/e8c226f0ce4ebb0e326ec38a4dee81fc142a5589.png";

// Writing Sample images
const wsImage10 = "/imports/02WritingSample/7500cd3cadaacce24f3eb950d585efc0e01c6e5d.png";
const wsPhoto = "/imports/02WritingSample/87ebe7e7d714c3c7b3bdeb076940292155a70ca7.png";
const wsImage9 = "/imports/02WritingSample/eb6add21a75ba300f515952b4877c3540c34ec6e.png";

// Letter of Endorsement
const letterImg = "/imports/03LetterOfEndorsement/425056c595d4249bcc2d26dab5c417aee0627980.png";
const letterPdf = "/imports/Joey_Connolly_-_Letter_of_Endorsement.pdf";

// Homescape images
const homescapeBg = "/imports/04Homescape-1/homescape-poster.jpg";
const homescapeLogo = "/imports/04Homescape-1/8fe3d075165fceba9994ba4d006d898949e0cb8c.png";
const hsFeatured1 = "/imports/04Homescape-1/1a317e0205330e43c338275a95c89c9b5b426043.png";
const hsFeatured2 = "/imports/04Homescape-1/9eb83c2137abc4b8dfaa47b9e37c46c86e4bbe7f.png";
const hsFeatured3 = "/imports/04Homescape-1/25044e89d050aa4f69cd442c97970bc283ab6789.png";
const hsGallery1 = "/imports/04Homescape-1/0b4a3b54c7a178636f2a8222c254ec1ef2895514.png";
const hsGallery2 = "/imports/04Homescape-1/30271de092364d67376dc6598e2c6935b33c4288.png";
const hsGallery3 = "/imports/04Homescape-1/4ce7dac195c92073da19f7145fb2917f5a18d0fe.png";
const hsGallery4 = "/imports/04Homescape-1/a559f69a08fe7846f0d04fdb615bc6514c4022a5.png";
const hsGalleryLarge = "/imports/04Homescape-1/42968b4612124e72b9c4e415eb51c6b5d546b166.png";
const hsVideoThumb1 = "/imports/04Homescape-1/yt-NjqbatBl7vs.jpg";
const hsVideoThumb2 = "/imports/04Homescape-1/yt-tEccUh0s3mI.jpg";
const hsGallery451 = "/imports/04Homescape-1/gallery-451.jpg";

// Creative Experience
const yotamSnapshot = "/imports/05CreativeProfessionalExperience/yotamrozin-snapshot.png";
const cvPdf = "/imports/Yotam_Rozin_CV_2026.pdf";

const BLUE = "#0034E0";
const HOMESCAPE_URL = "https://yotamrozin.wixsite.com/yotam-rozin/homescape";
const PORTFOLIO_URL = "https://www.yotamrozin.com/";
const HOMESCAPE_VIDEO =
  "https://video.wixstatic.com/video/f7efcb_7a31416939fb4b82aa5c7b6164eb3e36/1080p/mp4/file.mp4";
// Toggle to fall back to the still poster + logo overlay (kept for later use).
const HOMESCAPE_USE_VIDEO = true;
const BRAND = "'General Sans', system-ui, sans-serif";
const SERIF = "'EB Garamond', Georgia, serif";
const BODY = "'Inter', system-ui, sans-serif";

// ---------- reusable animation wrapper ----------
const fadeUpVariant = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 24 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0 },
};

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeUpVariant}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ---------- buttons ----------
function PrimaryButton({
  children,
  href,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  const base =
    "group inline-flex items-center justify-center px-6 py-2.5 rounded-full cursor-pointer select-none " +
    "border-2 border-[#0034E0] bg-[#0034E0] text-white " +
    "hover:bg-transparent hover:text-[#0034E0]";
  const textStyle: React.CSSProperties = { fontFamily: BRAND, fontWeight: 600, fontSize: "1rem", lineHeight: 1.2, whiteSpace: "nowrap" };

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={base} style={textStyle}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={base} style={textStyle}>
      {children}
    </button>
  );
}

function SecondaryButton({
  children,
  href,
  onClick,
  light = false,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  light?: boolean;
}) {
  const base =
    "group inline-flex items-center justify-center px-6 py-2.5 rounded-full cursor-pointer select-none border-2 bg-transparent " +
    (light
      ? "border-white text-white hover:bg-white hover:text-black"
      : "border-[#0034E0] text-[#0034E0] hover:bg-[#0034E0] hover:text-white");
  const textStyle: React.CSSProperties = { fontFamily: BRAND, fontWeight: 600, fontSize: "1rem", lineHeight: 1.2, whiteSpace: "nowrap" };

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={base} style={textStyle}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={base} style={textStyle}>
      {children}
    </button>
  );
}

// ---------- parallax image ----------
function ParallaxImage({
  src,
  alt,
  scrollY,
  factor = 0.12,
  className = "",
  imgClassName = "",
  style,
  reveal = false,
  revealDelay = 0,
}: {
  src: string;
  alt: string;
  scrollY: number;
  factor?: number;
  className?: string;
  imgClassName?: string;
  style?: React.CSSProperties;
  reveal?: boolean;
  revealDelay?: number;
}) {
  // Parallax moves the whole element at a speed relative to page scroll.
  // Different `factor` values make some images drift faster than others.
  // There is intentionally no transform on the inner <img>, so the image
  // content stays fixed within its frame (no "parallax within the image").
  const offset = -scrollY * factor;

  // `y` is passed as a plain (re-rendered) style value rather than a manual
  // transform string so it composes with the framer-driven scale/opacity
  // reveal below instead of fighting over the `transform` CSS property.
  const revealProps = reveal
    ? {
        initial: { opacity: 0, scale: 0.94, filter: "blur(6px)" },
        animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
        transition: { duration: 0.95, delay: revealDelay, ease: [0.22, 1, 0.36, 1] as const },
      }
    : {};

  return (
    <motion.div
      className={className}
      style={{ ...style, y: offset, willChange: "transform" }}
      {...revealProps}
    >
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover pointer-events-none ${imgClassName}`}
      />
    </motion.div>
  );
}

// ---------- lightbox ----------
type MediaItem = { src: string; alt: string; videoEmbedSrc?: string };

function Lightbox({
  images,
  startIndex,
  open,
  onClose,
}: {
  images: MediaItem[];
  startIndex: number;
  open: boolean;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIndex);

  useEffect(() => {
    setIdx(startIndex);
  }, [startIndex, open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + images.length) % images.length);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, images.length, onClose]);

  const current = images[idx];

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4 outline-none">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-10"
            aria-label="Close"
          >
            <X size={32} />
          </button>
          {images.length > 1 && (
            <>
              <button
                onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
                className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl font-light z-10 select-none"
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                onClick={() => setIdx((i) => (i + 1) % images.length)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl font-light z-10 select-none"
                aria-label="Next"
              >
                ›
              </button>
            </>
          )}
          {current?.videoEmbedSrc ? (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-[90vw] max-w-[1100px] aspect-video rounded-lg overflow-hidden shadow-2xl bg-black"
            >
              <iframe
                className="w-full h-full"
                src={`${current.videoEmbedSrc}?autoplay=true`}
                title={current.alt}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          ) : (
            <motion.img
              key={idx}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={current?.src}
              alt={current?.alt ?? ""}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// ============================================================
// NAVBAR
// ============================================================
function Navbar() {
  const handleNav = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-10 pb-4 pointer-events-none"
    >
      <div
        className="flex gap-16 pointer-events-auto"
        style={{ fontFamily: BRAND, fontWeight: 500, fontSize: "1.1rem", color: BLUE }}
      >
        {[
          { label: "Writing Sample", id: "writing-sample" },
          { label: "Letter of Endorsement", id: "letter-of-endorsement" },
          { label: "Creative Background", id: "homescape" },
          { label: "CV & Links", id: "creative-experience" },
        ].map(({ label, id }) => (
          <button
            key={id}
            onClick={() => handleNav(id)}
            className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
          >
            {label}
          </button>
        ))}
      </div>
    </motion.nav>
  );
}

// ============================================================
// HERO SECTION
// ============================================================
function HeroSection({ scrollY }: { scrollY: number }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-x-clip bg-white"
      style={{ minHeight: "100svh" }}
    >
      {/* Scattered photos */}
      <ParallaxImage
        src={heroPicture32}
        alt="Project photo"
        scrollY={scrollY}
        factor={0.1}
        reveal
        revealDelay={0.55}
        className="absolute rounded-sm shadow-sm"
        style={{ left: "5.3%", top: "calc(42% + 6rem)", width: "17%", aspectRatio: "328/429" }}
      />
      <ParallaxImage
        src={heroPicture21}
        alt="Project photo"
        scrollY={scrollY}
        factor={0.15}
        reveal
        revealDelay={0.67}
        className="absolute rounded-sm shadow-sm"
        style={{ left: "39%", top: "calc(50% + 6rem)", width: "30%", aspectRatio: "589/298" }}
      />
      <ParallaxImage
        src={heroPhoto}
        alt="Project photo"
        scrollY={scrollY}
        factor={0.08}
        reveal
        revealDelay={0.79}
        className="absolute rounded-sm shadow-sm"
        style={{ left: "72%", top: "calc(40% + 6rem)", width: "18%", aspectRatio: "347/508" }}
      />
      <ParallaxImage
        src={heroImg7}
        alt="Project photo"
        scrollY={scrollY}
        factor={0.18}
        reveal
        revealDelay={0.91}
        className="absolute rounded-sm shadow-sm"
        style={{ left: "28%", top: "calc(63% + 6rem)", width: "14.5%", aspectRatio: "276/422" }}
      />
      <ParallaxImage
        src={heroImg8}
        alt="Project photo"
        scrollY={scrollY}
        factor={0.13}
        reveal
        revealDelay={1.03}
        className="absolute rounded-sm shadow-sm"
        style={{ left: "50%", top: "calc(78% + 6rem)", width: "22.5%", aspectRatio: "434/230" }}
      />

      {/* Central text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
        <motion.h1
          initial={{ opacity: 0, filter: "blur(6px)", scale: 0.96 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 0.95, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: BRAND, fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.2rem)", color: BLUE, lineHeight: 0.9, letterSpacing: "-0.01em" }}
        >
          THE WORLD AS A PARENT
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, filter: "blur(6px)", scale: 0.96 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 0.95, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(1.2rem, 2.4vw, 2rem)", color: BLUE, lineHeight: 0.9, marginTop: "1.2rem" }}
        >
          by Yotam Rozin
        </motion.p>
      </div>
    </section>
  );
}

// ============================================================
// WRITING SAMPLE SECTION
// ============================================================
function WritingSampleSection({ scrollY }: { scrollY: number }) {
  const excerpts = [
    {
      title: "Excerpt I — Bonds: The First Cosmology",
      col1: `As Korczak writes, "the same blood runs through its and your veins, and not a single drop of your red blood knows whether it will remain yours or its, or will be spilled to perish as a toll collected by the mystery of conception and delivery." (trans. Olga Medvedeva-Nathoo)\n\nThe most conspicuous and vigorous experience of our early life must be the yolk-sac- and placenta-mediated exchange of blood with the world. Before anything else, we are suspended in a fluidal communion in the medium of blood. The blood of the mother is no longer the blood of one — it becomes a third element, turning two into one, the first bond between two bodies interlocked in bipolar intimacy. The bond itself, the exchange and connection, fills experience with an intense closeness that traverses the boundaries between in and out. It is no wonder that most love symbols are coloured red — in the state of womb-immanent blood communion you are in love.`,
      col2: `The exchange of placental-umbilical blood, filled with substantial nourishment as well as toxins, is a powerful, constant, pulsating, and colossal state of closeness. The pulsation is a rhythmic bond between two hearts, a blood communion bringing hearts and nourishment into attunement. We feel a communion suspended in a flow, surging in pulsations, which satiates, nourishes, enlivens, and catalyses constant change with a powerful sense of growth.`,
    },
    {
      title: "Excerpt II — Korczak and the Canary",
      col1: `Henryk Goldszmit was a sheltered child, raised in a Warsaw upper-middle-class home and largely kept indoors for fear of his frail health. His closest friend was a canary — a fellow captive whose life, like Henryk's, was caged by caution. At five years old, Henryk awoke one morning to a devastating sight: his beloved bird lay motionless at the bottom of its cage. His biographer, Betty Jean Lifton, recounts how the grief-stricken boy "put the beak in his mouth, and tried to breathe life into it" — a futile act of desperate love. With his younger sister Anna as accomplice, they wrapped the tiny body in cloth and placed it in an empty candy box, to be buried beneath the chestnut tree in the forbidden courtyard.\n\nIn May 1942, caged now between the walls of the Nazi Warsaw Ghetto, Henryk — by then known as Janusz Korczak, the Old Doctor — recalled that childhood loss:\n\n"Granny would hand me a raisin and say 'You philosopher.' Apparently, in an intimate talk with Granny, I had already confided my audacious plan to transform the world [...] What to do for`,
      col2: ` there to be no dirty, ragged, and hungry children with whom I was not permitted to play in the courtyard, where under the chestnut, in a boiled-sweet tin and wrapped in cotton wool, my first deceased, close dear friend lay buried, as yet only a canary? Its death had raised the mysterious question of religion. I wanted to put a cross on its grave. Our servant said that I couldn't, because it was a bird, something much lower than a person. It was a sin even to cry. So much for the servant. But what was worse, the janitor's son declared that the canary was a Jew. And I was a Jew."\n\nFive-year-old Henryk saw in his canary not a pet, but a kin — a person among persons, worthy of love, grief, and the solemnity of a ritual burial. This same boy would dedicate his life to defending the personhood of children in a world that too often denied it. As we trace the world's story as a parent, this "mysterious question of religion" — of who is granted dignity, and who has no right to be mourned — is never merely historical. It is woven into the fabric of our collective and personal lives still.`,
    },
    {
      title: "Excerpt III – The Story of Tiamat",
      col1: `Between 3300 and 1200 B.C., warring kingdoms and empires that would capture modern imagination thrived in South-West Asia and North Africa. Ancient Egypt, Israel, and Mesopotamia, among others, all believed the world was surrounded on all sides by primordial oceans. And it is out of that amniotic fluid that everything they knew was born. Like their ancestors, they associated bodies of water, and these cosmological oceans in particular, with the maternal body and the uterine environment. The threat of chaos that these feminine waters posed, as far as they understood, meant that these Bronze Age civilizations paired this cosmology with colossal urban architectural projects — layers of monumental walls sheltering their inhabitants in capsules of law and order — a sort of protective and containing man-made realm where these chaotic oceanic forces were conquered and tamed.\n\nWhere Neolithic tradition venerated benevolent goddesses as life-givers and creators, Bronze Age people demoted their goddesses to lesser existential stature. In their place, a new generation of heroic male gods rose to power and fame by defeating these wretched mother monsters. Death, which once meant a sweet return to luscious fertile land — absorbed back into the mother — came to mean a grim descent into a barren and ghastly netherworld. As goddesses were demoted and demonized, so too were their mortal counterparts — women — feared and loathed. Creation stories of the first women, from the late third millennium onward, told of the scourge they brought upon mankind — effectively severing the connection with the divine and bringing punishment and disease.\n\nBabylonian mythological poetry tells of the mother of all Gods, the primordial ocean — Tiamat — the amniotic fluid origin of divine life, and hence the source of`,
      col2: ` all existence. Her name, Tiamat, is born out of the Akkadian words tiamtum or tâmtu, meaning "sea." Her epithet, Muallidat gimrišun — "who bore them all" — attests to her role as oceanic creatrix. But Tiamat did not create the gods and world alone — Apsu, the god of the still sweet waters of the underground, was her consort. It is their union — the union of feminine chaos and masculine stillness, of the water of heaven and the water inside the earth — that birthed the world the Babylonians inherited.\n\nTiamat herself succeeded the place of a much earlier Sumerian goddess, Namma (or Nammu). Her name is written with the sign for the engur — the subterranean, undifferentiated life-giving waters (Apsu/abzu). The venerated goddess was praised by her worshipers in song: "the mother who gave birth to heaven and earth" and "the first mother who bore the gods of the universe." Unlike Tiamat's story, the Sumerian myth is a story of parthenogenesis, or "virgin birth" — Namma has no male counterpart and thus spontaneously conceives and births the world all on her own.\n\nTiamat and Apsu, in that sense, are Namma split into two primordial waters, two foundational life forces. After a war between her husband and their sons ends with Apsu's death, Tiamat's asexual reproduction births only monsters. In her vengeful grief, Tiamat sends her monstrous progeny — eleven fierce demons — to kill her very own children. But the lion-headed storm demon Ugallu, the scorpion-humanoid Girtablullû, the snake-dragon Mušḫuššu, and all the other hybrid abominations failed to protect her from her son Marduk. The hero warrior god slays Tiamat, and from his mother's corpse, creates the world the Babylonians inhabited. "In the hands of Marduk," writes Katz, "Tiamat, the sea of amniotic fluid, would become the building material of the whole universe."`,
    },
  ];

  return (
    <section id="writing-sample" className="bg-white pt-0">
      {/* Parallax image band — each photo is sized to its true aspect ratio and
          the container is NOT clipped, so every image shows in full and drifts
          as a rigid whole (no content scrolling within the frame). The differing
          `factor` values make them move at different speeds. */}
      <div className="relative h-80 md:h-[30rem] w-full">
        <ParallaxImage
          src={wsImage10}
          alt="Writing sample image"
          scrollY={scrollY}
          factor={0.14}
          className="absolute"
          style={{ left: "7%", top: "34%", width: "15%", aspectRatio: "898/1260" }}
        />
        <ParallaxImage
          src={wsImage9}
          alt="Writing sample image"
          scrollY={scrollY}
          factor={0.05}
          className="absolute"
          style={{ left: "40%", top: "50%", width: "20%", aspectRatio: "718/409" }}
        />
        <ParallaxImage
          src={wsPhoto}
          alt="Writing sample image"
          scrollY={scrollY}
          factor={0.18}
          className="absolute"
          style={{ left: "74%", top: "44%", width: "15%", aspectRatio: "359/269" }}
        />
      </div>

      {/* Heading + intro */}
      <div className="max-w-[1200px] mx-auto px-8 md:px-16 pt-16 pb-12">
        <FadeUp>
          <h2
            style={{ fontFamily: BRAND, fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: BLUE, lineHeight: 1.2, marginBottom: "1.25rem" }}
          >
            Writing Sample
          </h2>
          <p style={{ fontFamily: BODY, fontSize: "clamp(0.95rem, 1.4vw, 1.25rem)", color: BLUE, lineHeight: 1.5, maxWidth: "900px" }}>
            Three short excerpts from <em>The World as a Parent</em> illustrate the book's movement between historical exploration, poetic inquiry, and narrative life-writing. Together they show how the book weaves ancient cosmological narratives, our shared experience of being in the womb, and the questions sparked by Janusz Korczak's life and writing into a single, sustained literary inquiry into the world as a parent.
          </p>
        </FadeUp>
      </div>

      {/* Excerpts */}
      <div className="max-w-[1200px] mx-auto px-8 md:px-16 pb-28 flex flex-col gap-20">
        {excerpts.map((ex, i) => (
          <FadeUp key={i} delay={i * 0.08}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div style={{ fontFamily: BODY, fontSize: "clamp(0.85rem, 1.1vw, 1rem)", color: BLUE, lineHeight: 1.6 }}>
                <p style={{ fontWeight: 600, marginBottom: "1rem" }}>{ex.title}</p>
                {ex.col1.split("\n\n").map((p, j) => (
                  <p key={j} style={{ marginBottom: "1rem" }}>{p}</p>
                ))}
              </div>
              <div style={{ fontFamily: BODY, fontSize: "clamp(0.85rem, 1.1vw, 1rem)", color: BLUE, lineHeight: 1.6 }}>
                {ex.col2.split("\n\n").map((p, j) => (
                  <p key={j} style={{ marginBottom: "1rem" }}>{p}</p>
                ))}
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// LETTER OF ENDORSEMENT SECTION
// ============================================================
function LetterOfEndorsementSection() {
  return (
    <section id="letter-of-endorsement" className="bg-white py-24">
      <div className="max-w-[1200px] mx-auto px-8 md:px-16">
        <FadeUp>
          <h2
            style={{ fontFamily: BRAND, fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: BLUE, lineHeight: 1.2, marginBottom: "1.25rem" }}
          >
            Letter of Endorsement
          </h2>
          <p style={{ fontFamily: BODY, fontSize: "clamp(0.95rem, 1.4vw, 1.25rem)", color: BLUE, lineHeight: 1.5, maxWidth: "860px", marginBottom: "4rem" }}>
            A letter from Joey Connolly, former Head of Faber Academy, who has mentored the development of this manuscript and its literary voice.
          </p>
        </FadeUp>

        {/* Floating letter image */}
        <div className="flex justify-center">
          <a
            href={letterPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
            style={{ animation: "floatY 5s ease-in-out infinite" }}
          >
            <div
              className="relative overflow-hidden rounded-sm"
              style={{ width: "min(520px, 80vw)", boxShadow: "0 0 50px rgba(0,0,0,0.18), 0 0 0 6px #000" }}
            >
              <img
                src={letterImg}
                alt="Letter of Endorsement by Joey Connolly"
                className="w-full h-auto block"
              />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// HOMESCAPE SECTION
// ============================================================
function HomescapeSection({ scrollY }: { scrollY: number }) {
  // Media shown in the gallery / lightbox. The large image comes first so
  // its index (0) is stable; videos play only inside the lightbox.
  // Photos first (index 0 = featured large image), then videos. The lightbox
  // receives the whole array so arrow-navigation flows across everything.
  const galleryMedia: MediaItem[] = [
    { src: hsGalleryLarge, alt: "Homescape gallery large image" },
    { src: hsGallery1, alt: "Homescape gallery image 1" },
    { src: hsGallery2, alt: "Homescape gallery image 2" },
    { src: hsGallery3, alt: "Homescape gallery image 3" },
    { src: hsGallery4, alt: "Homescape gallery image 4" },
    { src: hsGallery451, alt: "Homescape gallery image 5" },
    {
      src: hsVideoThumb1,
      alt: "Homescape — Al Jazeera feature",
      videoEmbedSrc: "https://iframe.mediadelivery.net/embed/504938/11700986-9e58-4255-b155-70af30cbebb7",
    },
    {
      src: hsVideoThumb2,
      alt: "Homescape — video",
      videoEmbedSrc: "https://iframe.mediadelivery.net/embed/504938/f6a09cec-73a1-424b-82ed-ebf85165bb27",
    },
  ];
  const VIDEO_START = 6; // index of the first video in galleryMedia
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const openLightbox = useCallback((idx: number) => {
    setLightboxIdx(idx);
    setLightboxOpen(true);
  }, []);

  // Poster stays fixed (no parallax); the logo fades out as the section scrolls up.
  const posterRef = useRef<HTMLDivElement>(null);
  const [logoOpacity, setLogoOpacity] = useState(1);

  useEffect(() => {
    const el = posterRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Fully visible when the poster top is at the viewport top; faded once
    // roughly half the poster has scrolled past.
    const progress = Math.min(Math.max(-rect.top / (rect.height * 0.5), 0), 1);
    setLogoOpacity(1 - progress);
  }, [scrollY]);

  return (
    <section id="homescape" className="bg-black text-white relative overflow-hidden">
      {/* Fixed hero (no parallax) — muted background video, with the still poster
          + logo overlay kept in code (hidden) as a fallback option. */}
      <div ref={posterRef} className="relative h-[70vh] min-h-[500px] overflow-hidden">
        {HOMESCAPE_USE_VIDEO ? (
          <video
            className="absolute inset-0 w-full h-full object-cover object-center"
            src={HOMESCAPE_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        ) : (
          <>
            <img
              src={homescapeBg}
              alt="Homescape background"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Logo overlay — fades out on scroll, links to Homescape URL */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <a
                href={HOMESCAPE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                style={{ width: "min(620px, 80vw)", opacity: logoOpacity }}
              >
                <img src={homescapeLogo} alt="Homescape logo" className="w-full h-auto" />
              </a>
            </div>
          </>
        )}
      </div>

      {/* Main content */}
      <div className="max-w-[1200px] mx-auto px-8 md:px-16 py-20">
        <FadeUp>
          <h2
            style={{ fontFamily: BRAND, fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "white", lineHeight: 1.2, marginBottom: "3rem" }}
          >
            Notable Artistic Practice
          </h2>
        </FadeUp>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Text column */}
          <div className="lg:col-span-3">
            <FadeUp>
              <a
                href={HOMESCAPE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:opacity-75 transition-opacity"
              >
                <h3
                  style={{ fontFamily: BRAND, fontWeight: 600, fontSize: "clamp(1.3rem, 2.2vw, 1.9rem)", color: "white", lineHeight: 1.4, marginBottom: "1.25rem" }}
                >
                  Homescape (2018)
                </h3>
              </a>
              <p style={{ fontFamily: BODY, fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)", color: "white", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                Through a guided meditation, participants are drawn into the dark liminal landscape of the fields surrounding Ma'as, the artist's hometown. They then freely explore regions close to home as well as their own personal uncharted territories.
              </p>
              <p style={{ fontFamily: BODY, fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)", color: "white", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                In the midst of the native biota, vestiges of British colonial rule, and ruins of Palestinian settlements, players encounter the inhabitants of the cultural unconscious, who reside together to form the sites of the artist's childhood memories.
              </p>
              <p style={{ fontFamily: BODY, fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)", color: "white", lineHeight: 1.6, marginBottom: "2.5rem" }}>
                Presenting the piece throughout 2016–2018 presented an opportunity to engage personally with diverse communities around the world and people of all ages.
              </p>
              <SecondaryButton href={HOMESCAPE_URL} light>
                More Info
              </SecondaryButton>
            </FadeUp>
          </div>

          {/* Featured-in sidebar */}
          <div className="lg:col-span-2">
            <FadeUp delay={0.15}>
              <p style={{ fontFamily: BRAND, fontWeight: 600, fontSize: "1.1rem", color: "white", marginBottom: "1.5rem" }}>
                Featured in
              </p>
              <div className="flex flex-col items-center gap-6">
                <img src={hsFeatured1} alt="A MAZE festival" className="w-full max-w-[200px] object-contain opacity-90" />
                <img src={hsFeatured2} alt="IDFA DocLab" className="w-full max-w-[200px] object-contain opacity-90" />
                <img src={hsFeatured3} alt="Festival feature" className="w-full max-w-[120px] object-contain opacity-90" />
              </div>
            </FadeUp>
          </div>
        </div>

        {/* Photo gallery — featured large image + tiles */}
        <FadeUp className="mt-16">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {/* Featured large image (index 0) */}
            <div
              className="col-span-2 row-span-2 overflow-hidden rounded-sm cursor-pointer"
              onClick={() => openLightbox(0)}
            >
              <img
                src={hsGalleryLarge}
                alt="Homescape VR experience"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            {/* Remaining photo tiles (indices 1..VIDEO_START-1) */}
            {galleryMedia.slice(1, VIDEO_START).map((item, i) => {
              const idx = i + 1;
              return (
                <div
                  key={idx}
                  className="overflow-hidden rounded-sm cursor-pointer group/tile"
                  style={{ aspectRatio: "424/255" }}
                  onClick={() => openLightbox(idx)}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/tile:scale-105"
                  />
                </div>
              );
            })}
          </div>
        </FadeUp>

        {/* Video gallery — two videos, two columns (play in lightbox) */}
        <FadeUp className="mt-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {galleryMedia.slice(VIDEO_START).map((item, i) => {
              const idx = i + VIDEO_START;
              return (
                <div
                  key={idx}
                  className="relative overflow-hidden rounded-sm cursor-pointer group/tile"
                  style={{ aspectRatio: "16/9" }}
                  onClick={() => openLightbox(idx)}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/tile:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover/tile:bg-black/40">
                    <span className="flex items-center justify-center w-16 h-16 rounded-full bg-black/60 backdrop-blur-sm">
                      <Play size={26} className="text-white translate-x-[2px]" fill="white" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeUp>

        {/* Notable Presentations */}
        <FadeUp className="mt-20">
          <h3
            style={{ fontFamily: BRAND, fontWeight: 600, fontSize: "clamp(1.2rem, 2vw, 1.75rem)", color: "white", marginBottom: "1.5rem" }}
          >
            Notable Presentations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
            {[
              "Festival De Cannes – Israeli Pavilion | Cannes, France (2016: as WIP)",
              "A MAZE – Nominee + Exhibition | Berlin, Germany (2018)",
              "GameOn! – Exhibition | Buenos Aires, Argentina (2017)",
              "The First International Digital Design Symposium and Festival | Taipei, Taiwan (2018)",
              "Beit Kandinof – Solo Exhibition · Homescape, curator: Lior Sedan | Tel Aviv, Israel (2018)",
              "Print Screen Festival – Artist in Residence + Exhibition | Holon, Israel (2017: as WIP)",
              "Haifa International Film Festival – VR Garden | Haifa, Israel (2016: as WIP)",
              "DocAviv | Tel Aviv / Yeruham, Israel (2016: as WIP)",
              "Animation – Jerusalem, Israel (2016: as WIP)",
            ].map((item, i) => (
              <p
                key={i}
                style={{ fontFamily: BODY, fontSize: "clamp(0.85rem, 1.1vw, 1rem)", color: "white", lineHeight: 1.5 }}
              >
                {item}
              </p>
            ))}
          </div>
        </FadeUp>
      </div>

      <Lightbox
        images={galleryMedia}
        startIndex={lightboxIdx}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  );
}

// ============================================================
// CREATIVE PROFESSIONAL EXPERIENCE + FOOTER
// ============================================================
function CreativeExperienceSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="creative-experience" className="bg-white">
      {/* Main content */}
      <div className="max-w-[1200px] mx-auto px-8 md:px-16 py-24">
        <FadeUp>
          <h2
            style={{ fontFamily: BRAND, fontWeight: 600, fontSize: "clamp(1.75rem, 3.5vw, 3rem)", color: BLUE, lineHeight: 1.2, marginBottom: "3rem" }}
          >
            Creative Professional Experience
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: portfolio snapshot — links out, gentle zoom on hover */}
          <FadeUp delay={0.1}>
            <a
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-[40px] shadow-sm"
              aria-label="Visit yotamrozin.com"
            >
              <img
                src={yotamSnapshot}
                alt="Snapshot of yotamrozin.com"
                className="w-full h-auto object-cover rounded-[40px] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </a>
          </FadeUp>

          {/* Right: text + buttons */}
          <FadeUp delay={0.2} className="flex flex-col justify-center gap-10">
            <p style={{ fontFamily: BODY, fontSize: "clamp(0.95rem, 1.3vw, 1.15rem)", color: BLUE, lineHeight: 1.6 }}>
              Alongside my artistic practice, I work as an independent multidisciplinary designer and creative lead. I manage projects from initial strategy through to final delivery, overseeing timelines, budgets, and project scope while designing brands, websites, motion graphics, and digital experiences. My work combines creative direction, systems thinking, and hands-on design to deliver cohesive and impactful outcomes for clients.
            </p>
            <div className="flex flex-wrap gap-4">
              <PrimaryButton href={PORTFOLIO_URL}>
                Visit My Website
              </PrimaryButton>
              <SecondaryButton href={cvPdf}>
                Download CV
              </SecondaryButton>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Thank you + footer */}
      <div className="border-t border-[#0034E0]/10 py-24 text-center">
        <FadeUp>
          <h2
            style={{ fontFamily: BRAND, fontWeight: 600, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: BLUE, marginBottom: "4rem" }}
          >
            Thank you for your time!
          </h2>

          <div style={{ fontFamily: BRAND, fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: BLUE, lineHeight: 0.9, marginBottom: "0.6rem" }}>
            THE WORLD AS A PARENT
          </div>
          <div
            style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(1rem, 2vw, 1.6rem)", color: BLUE, lineHeight: 0.9, marginBottom: "2.5rem" }}
          >
            by Yotam Rozin
          </div>

          {/* Scroll-to-top arrow — same hover as secondary button */}
          <div className="flex justify-center mt-2">
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="group inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-[#0034E0] text-[#0034E0] hover:bg-[#0034E0] hover:text-white"
            >
              <ArrowUp size={22} />
            </button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ============================================================
// GLOBAL KEYFRAMES
// ============================================================
const GlobalStyles = () => (
  <style>{`
    @keyframes floatY {
      0%   { transform: translateY(0px); }
      50%  { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
  `}</style>
);

// ============================================================
// APP
// ============================================================
export default function App() {
  const [scrollY, setScrollY] = useState(0);

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08 });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Keep scrollY in sync with Lenis
    lenis.on("scroll", () => {
      setScrollY(lenis.scroll);
    });

    return () => lenis.destroy();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <GlobalStyles />
      <Navbar />
      <HeroSection scrollY={scrollY} />
      <WritingSampleSection scrollY={scrollY} />
      <LetterOfEndorsementSection />
      <HomescapeSection scrollY={scrollY} />
      <CreativeExperienceSection />
    </div>
  );
}
