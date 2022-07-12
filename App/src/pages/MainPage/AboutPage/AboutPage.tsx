import SeparationSmallBar from "components/common/SeparationSmallGreenBar/SeparationSmallGreenBar";
import styles from "./AboutPage.module.scss";
import ErasmusIcon from "public/erasmus_plus.png";
import ATHLogo from "public/ATHLogo.png";
import BNTLogo from "public/BNTLogo.png";
import KievLogo from "public/KievLogo.png";
import NisLogo from "public/NisLogo.png";

const AboutPage = () => {
  return (
    <div className={styles.pageLayout}>
      <div className={styles.main}>
        <div className={styles.title}>About us</div>
        <SeparationSmallBar marginBottom="12px" marginTop="12px" />
        <div className={styles.content}>
          <div>
            Welcome to <b>Erasmus+ Innovations for Big Data in a Real World</b>
          </div>
          <div className={styles.bigDataSubtitle}>
            <b>BigData Smart JobHub</b>
          </div>
          <img src={ErasmusIcon} height={300} alt="Erasmus plus" />
          <div className={styles.mainTextColumn}>
            &emsp;<b>iBIGworld</b> is focused on identifying and ways to use Big
            Data as raised from via the internet, including social networks, web
            search requests, text messages, media files and data created by IoT
            devices and sensors, to help Higher Education Institutes (HEIs)
            follow the rapid pace of emerging industries.
          </div>
          <div className={styles.mainTextColumn}>
            &emsp;The project aims at developing common EU competences for Big
            Data management skills concerning the SMEs sector, thus meeting the
            labour market needs of skill shortages and gaps in all sectors. At
            the same time the project is aimed at improving the relevance of
            learning provision regarding Big Data management in SMEs in order to
            meet the cyber market&apos;s needs in the economy.
          </div>
          <div className={styles.mainTextColumn}>
            &emsp;<b>iBIGworld</b> foresees the development new curriculum,
            related to the use of Big Data to enhance the quality of management
            of modern ecosystems. In this way, the students will be enhancing
            their knowledge through the use of IT tools and by sharing aspects
            of training on Big Data management skill issues, and by doing so
            improving accessibility for everyone.
          </div>
          <div className={styles.mainTextColumn}>
            &emsp;The major priority of Big Data is to enhance the quality and
            relevance of students&apos; knowledge and skills, as the project
            aims to support HEIs to:
          </div>
          <div className={styles.mainTextColumn}>
            1. identify urgent technological challenges and needs of
            high-qualified personnel
          </div>
          <div className={styles.mainTextColumn}>
            2. train high-qualified students in ICT specific topics based on the
            skills required in labour market
          </div>
          <div className={styles.mainTextColumn}>
            3. to promote open links between Universities and industry,
            enhancing the relevance of higher education by supporting new
            ICT-based internship programs, connections between student HEIs and
            industry , market and industry premises.
          </div>
          <div className={styles.mainTextColumn}>
            <b>The Big Data</b> project supports innovation and creativity,
            through partnerships and inter- and transdisciplinary approaches,
            and strengthening the role of higher education regionally by:
          </div>
          <div className={styles.mainTextColumn}>
            a) highlighting emerging, cutting-edge technologies based on Big
            Data and Artifical Inteligense (AI) as pinpointed by market
            innovators
          </div>
          <div className={styles.mainTextColumn}>
            b) supporting open education and learning resources.
          </div>
        </div>
        <div className={styles.logos}>
          <a href={"https://www.ath.bielsko.pl"}>
            <img src={ATHLogo} height={275} alt="Erasmus plus" />
          </a>
          <a href={"https://www.unibit.bg"}>
            <img src={BNTLogo} height={200} alt="Erasmus plus" />
          </a>
          <a href={"http://www.univ.kiev.ua"}>
            <img src={KievLogo} height={225} alt="Erasmus plus" />
          </a>
          <a href={"https://www.ni.ac.rs"}>
            <img src={NisLogo} height={275} alt="Erasmus plus" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
