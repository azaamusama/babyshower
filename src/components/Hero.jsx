import Button from "./ui/Button.jsx";
import Motif from "./ui/Motif.jsx";
import "./Hero.css";

export default function Hero({ onStart }) {
  return (
    <div className="hero anim-fade-in-up">
      <Motif shape="star" size={28} className="hero__motif hero__motif--1 anim-float" />
      <Motif shape="balloon" size={34} className="hero__motif hero__motif--2 anim-float" />
      <Motif shape="bow" size={26} className="hero__motif hero__motif--3 anim-float" />

      <p className="eyebrow">You're invited to celebrate</p>
      <h1 className="hero__title">Baby Shower Games</h1>
      <p className="hero__subtitle">
        Welcome, friends! We're so glad you're here. Get ready for a warm,
        silly, heartfelt afternoon of games together before the little one
        arrives.
      </p>
      <Button size="lg" onClick={onStart}>
        Start Games
      </Button>
    </div>
  );
}
