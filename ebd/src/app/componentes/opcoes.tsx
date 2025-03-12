"use client";

import { useRouter } from "next/navigation";
import styles from "./opcoes.module.css";

export default function Opcoes() {
  const router = useRouter();

  const handleSelect = (opcao: string) => {
    const mensagem = `Olá Jovem, Tudo Bom? aceito sair contigo. Podemos ir na ${opcao} no dia ?.`;
    const whatsappUrl = `https://wa.me/5569993878894/?text=${encodeURIComponent(mensagem)}`;
    router.push(whatsappUrl);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Escolha um lugar para sair:</h1>

      <div className={styles.option}>
        <p className={styles.optionText}>
        <strong>Opcção 1:</strong> Inicialmente pensei em irmos na <strong>Nook</strong> pois combina<br></br> café e
          leitura 2 coisa que você gosta muito<br></br><br></br> <strong>Opcção 2:</strong> Mas como os horarios são bem limitados<br></br> e vivemos na correria poderiamos ir em algum <br></br>
          lugar como a SoftMania, Chiquinhos ou alguma outra.<br></br>
          ou Comer um lanchão no Brseiro ou Don Andi.
        </p>
        <button
          className={styles.button}
          onClick={() => handleSelect("Nook")}
        >
          Nook
        </button>
      </div>

      <div className={styles.option}>
        <button
          className={styles.button}
          onClick={() => handleSelect("?")}
        >
          Opcao 2
        </button>
      </div>

      
    </div>
  );
}
