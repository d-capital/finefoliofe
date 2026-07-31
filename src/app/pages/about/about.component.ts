import { Component, OnInit } from '@angular/core';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { NgFor, NgIf } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

interface ContentSection {
  title: string;
  subsections: ContentSubsection[];
}

interface ContentSubsection {
  title: string;
  content: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
}

interface Content {
  title: string;
  subtitle:string;
  sections: ContentSection[];
}

@Component({
  selector: 'app-about',
  imports: [NgIf, NgFor],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit{
  currentLanguage: 'en' | 'ru' | 'es' = 'en';
  content!: Content;

  constructor(
    private browserStorageService: BrowserStorageService, 
    private titleService: Title, 
    private metaService: Meta
  ) {}

  private ruContent: Content = {
    title: '',
    subtitle:'',
    sections: [
      {
        title: 'О нас',
        subsections: [
          {
            title: '',
            content: ['Мы - команда инвесторов-энтузиастов. И создали Valestor, потому что уверены,  чтобы принять правильное решение, нужны факты, а не сигналы из соцсетей.']
          },
          {
            title: '',
            content: ['Наш инструмент построен на принципах стоимостного инвестирования, но упакован в простой и понятный интерфейс. Никакой лишней сложности — только данные, которые действительно имеют значение.']
          },
          {
            title: '',
            content: ['Нас объединяет вера в то, что география не должна быть препятствием для качественного анализа. Поэтому мы сосредоточились на самых динамичных и сложных регионах мира: Латинская Америка, Россия, Индия, Китай и Юго-Восточная Азия.']
          }
        ]
      },
      {
        title: 'Миссия',
        subsections: [
          {
            title: '',
            content: ['Миссия - дать частным инвесторам инструмент для принятия решений на основе данных, а не эмоций и социального шума.'],
          },
        ]
      },
      {
        title: 'Видение',
        subsections: [
          {
            title: '',
            content: ['Мир, где большинство частных инвесторов используют объективные инструменты для оценки акций, а их портфели строятся на взвешенных стратегиях, а не на сиюминутных эмоциях.'],
          },
        ]
      },
      {
        title: 'Ценности',
        subsections: [
          {
            title: 'Специализация',
            content: ['Стоимостное инвестирование — наш фокус. Оцениваем акции через фундаментальный анализ.'],
          },
          {
            title: 'Простота',
            content: ['Визуализируем ключевые данные просто и понятно.'],
          },
          {
            title: 'Доступность',
            content: ['Даем качественный анализ бесплатно. В отличие от профессиональных решений за тысячи долларов.'],
          },
          {
            title: 'Охват рынков',
            content: ['Помогаем инвесторам из развивающихся рынков: Россия, Китай, Индия, Латинская Америка, Юго-Восточная Азия. Собираем данные там, где это сложно.'],
          }
        ]
      }
    ]
  };

  private esContent: Content = {
    title: '',
    subtitle:'',
    sections: [
      {
        title: 'Sobre nosotros',
        subsections: [
          {
            title: '',
            content: ['Somos un equipo de inversores apasionados. Creamos Valestor porque creemos que tomar la decisión correcta requiere hechos, no señales de redes sociales.']
          },
          {
            title: '',
            content: ['Nuestra herramienta se basa en los principios de la inversión en valor, pero se presenta en una interfaz simple e intuitiva. Sin complejidad innecesaria, solo datos que realmente importan.']
          },
          {
            title: '',
            content: ['Nos une la convicción de que la geografía no debe ser un obstáculo para un análisis de calidad. Por eso nos hemos centrado en las regiones más dinámicas y complejas del mundo: Latinoamérica, Rusia, India, China y el Sudeste Asiático.']
          }
        ]
      },
      {
        title: 'Misión',
        subsections: [
          {
            title: '',
            content: ['Nuestra misión es empoderar a los inversores privados para que tomen decisiones basadas en datos, no en emociones ni en el ruido social.'],
          },
        ]
      },
      {
        title: 'Visión',
        subsections: [
          {
            title: '',
            content: ['Un mundo donde la mayoría de los inversores privados utilicen herramientas objetivas para evaluar acciones, y sus carteras se construyan sobre estrategias medidas, no sobre emociones a corto plazo.'],
          },
        ]
      },
      {
        title: 'Valores',
        subsections: [
          {
            title: 'Especialización',
            content: ['Nos centramos en la inversión en valor. Evaluamos las acciones mediante análisis fundamental.'],
          },
          {
            title: 'Simplicidad',
            content: ['Visualizamos los datos clave de forma sencilla y clara.'],
          },
          {
            title: 'Accesibilidad',
            content: ['Ofrecemos análisis de alta calidad de forma gratuita. A diferencia de las soluciones profesionales que cuestan miles de dólares'],
          },
          {
            title: 'Cobertura de mercado',
            content: ['Ayudamos a los inversores en mercados emergentes: Rusia, China, India, Latinoamérica y el Sudeste Asiático. Recopilamos datos donde es difícil obtenerlos.'],
          }
        ]
      }
    ]
  };

  private enContent: Content = {
    title: '',
    subtitle: '',
    sections: [
      {
        title: 'About us',
        subsections: [
          {
            title: '',
            content: ['We are a team of passionate investors. We created Valestor because we believe that making the right decision requires facts, not social media signals.']
          },
          {
            title: '',
            content: ['Our tool is built on the principles of value investing, but packaged in a simple and intuitive interface. No unnecessary complexity—only data that really matters.']
          },
          {
            title: '',
            content: ["We are united by the belief that geography should not be an obstacle to quality analysis. That's why we've focused on the world's most dynamic and complex regions: Latin America, Russia, India, China, and Southeast Asia."]
          }
        ]
      },
      {
        title: 'Mission',
        subsections: [
          {
            title: '',
            content: ['Our mission is to empower private investors to make decisions based on data, not emotion and social noise.'],
          },
        ]
      },
      {
        title: 'Vision',
        subsections: [
          {
            title: '',
            content: ['A world where most private investors use objective tools to evaluate stocks, and their portfolios are built on measured strategies, not short-term emotions.'],
          },
        ]
      },
      {
        title: 'Values',
        subsections: [
          {
            title: 'Specialization',
            content: ['Value investing is our focus. We evaluate stocks through fundamental analysis.'],
          },
          {
            title: 'Simplicity',
            content: ['We visualize key data simply and clearly.'],
          },
          {
            title: 'Accessibility',
            content: ['We provide high-quality analysis for free. Unlike professional solutions that cost thousands of dollars.'],
          },
          {
            title: 'Market Coverage',
            content: ["We help investors in emerging markets: Russia, China, India, Latin America, Southeast Asia. We collect data where it's difficult."],
          }
        ]
      }
    ]
  };


  ngOnInit(): void {
    const lang = this.browserStorageService.getItem('language');
    this.currentLanguage = lang === 'ru' ? 'ru' : (lang === 'es' ? 'es' : 'en');
    this.content = this.currentLanguage === 'ru' ? this.ruContent : (this.currentLanguage === 'es' ? this.esContent : this.enContent);
    if (this.currentLanguage === 'ru'){
      this.titleService.setTitle(`Валестор - О нас`);
      this.metaService.updateTag({
        name: 'description',
        content: 'Наша миссия и видение'
      });
    } else if (this.currentLanguage === 'es') {
      this.titleService.setTitle(`Valestor - O nas`);
      this.metaService.updateTag({
        name: 'description',
        content: 'A mission, a vision'
      });
    } else {
      this.titleService.setTitle(`Valestor - About us`);
      this.metaService.updateTag({
        name: 'description',
        content: 'Our mission and vision'
      });
    }
  }

  typeof(value: any): string {
    return typeof value;
  }
}
