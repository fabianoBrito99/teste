"use client"; 
import Link from "next/link";
import styles from "./links.module.css";
import { useEffect, useState } from "react";

const FlowersAnimation = () => {
  const [animate, setAnimate] = useState(false);
  let messageStep = 0;
  let messageOpacity = 0;
  let messageVisible = false;

  useEffect(() => {
    setTimeout(() => setAnimate(true), 500);
  }, []);

  useEffect(() => {
    const canvas = document.getElementById("heartCanvas") as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);
    
    let heartPoints: { x: number; y: number }[] = [];
    const heartPointsCount = 100;
    let flowers: {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      petals: number;
      color: string;
    }[] = [];
    const flowerCount = 40;
    const flowerColors = ["red", "pink", "blue", "violet", "yellow"];
    let revealedPoints = 0;

    function heartShape(t: number) {
      return {
        x: 16 * Math.pow(Math.sin(t), 3) * 15 + width / 2,
        y: -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 15 + height / 2,
      };
    }

    for (let i = 0; i < heartPointsCount; i++) {
      heartPoints.push(heartShape(i * (Math.PI / 50)));
    }

    function createFlower() {
      const direction = Math.random() > 0.5 ? 1 : -1;
      return {
        x: Math.random() * width,
        y: height,
        size: Math.random() * 10 + 15,
        speedY: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() * 1 + 0.5) * direction,
        petals: Math.floor(Math.random() * 3) + 4,
        color: flowerColors[Math.floor(Math.random() * flowerColors.length)],
      };
    }

    for (let i = 0; i < flowerCount; i++) {
      flowers.push(createFlower());
    }

    function drawHeart() {
      if (!ctx) return;
      ctx.fillStyle = "red";
      for (let i = 0; i < revealedPoints; i++) {
        const point = heartPoints[i];
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      if (revealedPoints < heartPointsCount) {
        revealedPoints += 1;
        setTimeout(drawHeart, 1500);
      } else {
        messageVisible = true;
      }
      
      if (messageVisible && messageStep < 4) {
        setTimeout(() => {
          messageStep += 1;
          messageOpacity = 0;
        }, 100);
      }
      
      if (messageStep > 0 && messageOpacity < 1) {
        messageOpacity += 0.02;
      }
      
      // Draw message inside the heart with step-based fade-in effect
      ctx.globalAlpha = messageOpacity;
      ctx.fillStyle = "white";
      ctx.font = "bold 1.6rem Arial";
      ctx.textAlign = "center";
      if (messageStep >= 1) ctx.fillText("Obrigado pelos ótimos pitacos e", width / 2, height / 2 + -50);
      if (messageStep >= 2) ctx.fillText("por deixar meus ", width / 2, height / 2 + -25);
      if (messageStep >= 3) ctx.fillText("sites mais bonitos", width / 2, height / 2 + 0);
      if (messageStep >= 4) ctx.fillText("Se chegou até aqui é por ", width / 2, height / 2 + 70);
      if (messageStep >= 5) ctx.fillText("aceitou sair comigo", width / 2, height / 2 + 95);
      ctx.globalAlpha = 1;
      if (messageStep >= 6) ctx.fillText("clique no Botão", width / 2, height / 2 + 120);
      ctx.globalAlpha = 1;
    }

    function drawFlowers() {
      if (!ctx) return;
      flowers.forEach((flower) => {
        ctx.strokeStyle = "green";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(flower.x, flower.y);
        ctx.lineTo(flower.x, flower.y + 50);
        ctx.stroke();
        
        ctx.fillStyle = flower.color;
        for (let i = 0; i < flower.petals; i++) {
          const angle = (i * Math.PI * 2) / flower.petals;
          const petalX = flower.x + Math.cos(angle) * flower.size;
          const petalY = flower.y + Math.sin(angle) * flower.size;
          
          ctx.beginPath();
          ctx.ellipse(petalX, petalY, flower.size / 2, flower.size / 3, angle, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(flower.x, flower.y, flower.size / 4, 0, Math.PI * 2);
        ctx.fill();

        flower.y -= flower.speedY;
        flower.x += flower.speedX;
        if (flower.y < -20) {
          flowers = [];
          for (let i = 0; i < flowerCount; i++) {
            flowers.push(createFlower());
          }
        }
      });
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      drawFlowers();
      drawHeart();
      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <div className={styles.container}>
      <canvas id="heartCanvas" className={styles.canvas}></canvas>



      <Link href="/sim/opcoes">
          <button className={styles.whatsappButton}>
            Clique Aqui
          </button>
        </Link>
    </div>
    
  );
};

export default FlowersAnimation;
