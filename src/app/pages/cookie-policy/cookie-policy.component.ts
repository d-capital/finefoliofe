import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserStorageService } from '../../services/browser-storage.service';
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
  selector: 'app-cookie-policy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookie-policy.component.html',
  styleUrl: './cookie-policy.component.css'
})
export class CookiePolicyComponent implements OnInit {
  currentLanguage: 'en' | 'ru' = 'en';
  content!: Content;

  private ruContent: Content = {
    title: 'Политика использования файлов cookie',
    subtitle:'Редакция 1 от 22.04.2026',
    sections: [
      {
        title: '1. Общие положения',
        subsections: [
          {
            title: '',
            content: ['1.1. Настоящая Политика использования файлов cookie (далее - «Политика») определяет, какие типы файлов cookie использует сервис Valestor (далее - «Сайт», «Оператор»), с какой целью, на какой срок, кому передаются соответствующие данные, а также каковы права пользователя в отношении управления cookie.']
          },
          {
            title: '',
            content: ['1.2. Файлы cookie - это небольшие текстовые файлы, которые сохраняются на устройстве пользователя (компьютере, смартфоне, планшете) при посещении Сайта. Они позволяют Сайту распознавать устройство пользователя, запоминать его настройки и действия, собирать статистику и обеспечивать работу дополнительных функций.']
          },
          {
            title: '',
            content: ['1.3. Используя Сайт, пользователь соглашается с использованием файлов cookie в соответствии с настоящей Политикой, если не настроил иное в своем браузере.']
          }
        ]
      },
      {
        title: '2. Типы файлов cookie и цели их использования',
        subsections: [
          {
            title: '2.1. Необходимые (технические) cookie',
            content: ['Эти cookie строго обязательны для работы Сайта. Они обеспечивают навигацию, загрузку страниц, доступ к защищенным разделам, запоминание выбранного языка или региона. Без них Сайт не может функционировать должным образом. Согласие на обработку необходимых cookie не требуется по закону, однако Оператор информирует пользователя об их наличии.'],
            table: {
              headers: ['Название cookie', 'Срок хранения', 'Описание'],
              rows: [
                ['session_id', 'До закрытия браузера', 'Идентификация сессии пользователя'],
                ['csrf_token', 'До закрытия браузера', 'Защита от межсайтовых атак'],
                ['language', '2 года', 'Запоминание выбранного языка интерфейса'],
                ['cookie_consent', '2 года', 'Хранение согласия пользователя на использование необязательных cookie']
              ]
            }
          },
          {
            title: '2.2. Статистические (аналитические) cookie',
            content: ['Эти cookie позволяют Сайту собирать информацию о том, как посетители используют Сайт: какие страницы открывают, сколько времени проводят, откуда приходят, сталкиваются ли с ошибками. Данные используются для улучшения работы Сайта и пользовательского опыта. Все данные собираются в обезличенном виде и не позволяют напрямую идентифицировать конкретного человека, но в совокупности с другими данными могут признаваться персональными данными.'],
            table: {
              headers: ['Название cookie', 'Срок хранения', 'Поставщик', 'Описание'],
              rows: [
                ['_ga', '2 года', 'Google Analytics', 'Различение уникальных пользователей'],
                ['_gid', '2 года', 'Google Analytics', 'Различение уникальных пользователей'],
                ['_gat', '2 года', 'Google Analytics', 'Ограничение частоты запросов'],
                ['_ym_uid', '2 года', 'Яндекс.Метрика', 'Уникальный идентификатор посетителя'],
                ['_ym_d', '2 года', 'Яндекс.Метрика', 'Дата первого посещения'],
                ['_ym_isad', '2 года', 'Яндекс.Метрика', 'Проверка блокировки рекламы'],
                ['_ym_visorc', '2 года', 'Яндекс.Метрика', 'Для работы Вебвизора (запись действий)']
              ]
            }
          },
          {
            title: '2.3. Маркетинговые (рекламные) cookie',
            content: ['Эти cookie используются для показа релевантной рекламы, в том числе на других сайтах, ограничения числа показов одного объявления и оценки эффективности рекламных кампаний. Они устанавливаются рекламными партнерами Сайта.'],
            table: {
              headers: ['Название cookie', 'Срок хранения', 'Поставщик', 'Описание'],
              rows: [
                ['_gcl_au', '2 года', 'Google Ads', 'Отслеживание конверсий и ретаргетинг'],
                ['_ym_uid', '2 года', 'Яндекс.Метрика', 'Отслеживание конверсий и ретаргетинг']
              ]
            }
          }
        ]
      },
      {
        title: '3. Цели обработки данных',
        subsections: [
          {
            title: 'Сайт использует данные, получаемые через файлы cookie, для следующих целей:',
            content: [''],
            table: {
              headers: ['Тип cookie', 'Цели обработки'],
              rows: [
                ['Необходимые (технические)', 'Обеспечение корректной работы Сайта, безопасности, запоминание настроек пользователя.'],
                ['Статистические (аналитические)', 'Сбор статистики посещаемости, анализ поведения пользователей (воронки, тепловые карты), выявление ошибок, улучшение интерфейса и функциональности Сайта.'],
                ['Маркетинговые (рекламные)', 'Показ персонализированной рекламы, ограничение частоты показов, измерение эффективности рекламных кампаний, ретаргетинг.']
              ]
            }
          }
        ]
      },
      {
        title: '4. Перечень получателей (третьих лиц)',
        subsections: [
          {
            title: 'Данные, собранные через cookie, могут передаваться следующим третьим лицам:',
            content: [''],
            table: {
              headers: ['Получатель', 'Страна', 'Тип передаваемых данных', 'Цель передачи'],
              rows: [
                ['ООО «Яндекс» (Яндекс.Метрика)', 'Россия', 'Статистические cookie, обезличенный IP-адрес, данные о действиях на сайте', 'Аналитика, вебвизор'],
                ['Google LLC (Google Analytics, Google Ads)', 'США', 'Статистические и маркетинговые cookie, IP-адрес', 'Аналитика, реклама']
              ]
            }
          }
        ]
      },
      {
        title: '5. Трансграничная передача данных',
        subsections: [
          {
            title: '',
            content: ['5.1. Использование сервисов Google LLC (Google Analytics, Google Ads) влечет передачу данных файлов cookie на серверы, расположенные в Соединённых Штатах Америки.']
          },
          {
            title: '',
            content: ['5.2. Законодательство Российской Федерации не признает США страной, обеспечивающей адекватный уровень защиты прав субъектов персональных данных.']
          },
          {
            title: '',
            content: ['5.3. Перед началом трансграничной передачи Сайт запрашивает явное согласие пользователя через cookie-баннер. Пользователь может отказаться от передачи данных в США, настроив cookie вручную через настройки браузера и отключив использование файлов cookie.']
          },
          {
            title: '',
            content: ['5.4. Пользователь уведомлен, что передача данных в США может подразумевать доступ к ним со стороны государственных органов США в соответствии с местным законодательством. Оператор не несет ответственности за действия иностранных властей, но принимает меры для минимизации передаваемых данных.']
          }
        ]
      },
      {
        title: '6. Сроки хранения файлов cookie',
        subsections: [
          {
            title: '',
            content: ['6.1. Сроки хранения файлов cookie указаны в п. 2 настоящей Политики.']
          },
          {
            title: '6.2. Общие принципы:',
            content: [
              ' - сессионные cookie удаляются после закрытия браузера;',
              ' - постоянные cookie сохраняются на устройстве до истечения указанного срока либо до их удаления пользователем.'
            ]
          },
          {
            title: '',
            content: ['6.3. После истечения срока хранения cookie автоматически удаляются браузером.']
          }
        ]
      },
      {
        title: '7. Управление cookie. Права пользователя',
        subsections: [
          {
            title: '',
            content: ['7.1. При первом посещении Сайта пользователю показывается cookie-баннер. Нажав кнопку "Понятно", пользователь дает свое согласие на использование файлов cookie.']
          },
          {
            title: '',
            content: ['7.2. Пользователь может полностью отключить или удалить cookie через настройки своего браузера.']
          },
          {
            title: '',
            content: ['7.3. Отключение пользователем всех cookie, включая необходимые, может сделать Сайт недоступным или существенно ограничить его функциональность.']
          },
          {
            title: '7.4 Права субъекта персональных данных:',
            content: ['Поскольку данные cookie в ряде случаев являются персональными данными, пользователь имеет право:']
          },
          {
            title: '',
            content: [
              ' - отозвать согласие на обработку;',
              ' - запросить информацию о том, какие именно cookie и кому переданы;',
              ' - потребовать удаления собранных данных, кроме необходимых для работы Сайта;',
              ' - подать жалобу в Роскомнадзор.'
            ]
          },
          {
            title: '',
            content: ['7.5. Для реализации прав, не связанных с настройками браузера, устройства или баннера, пользователь должен обратиться к Оператору Сайта.']
          }
        ]
      },
      {
        title: '8. Заключительные положения',
        subsections: [
          {
            title: '',
            content: ['8.1. Пользователь по всем вопросам, связанным с использованием файлов cookie, может обратиться к Оператору с помощью электронной почты hello@valestor.com.']
          },
          {
            title: '',
            content: ['8.2. Оператор может периодически при необходимости обновлять настоящую Политику. Новая редакция Политики вступает в силу с момента ее размещения на Сайте.']
          },
          {
            title: '',
            content: ['8.3. Актуальная версия Политики в свободном доступе расположена на Сайте в сети Интернет по адресу https://valestor.com/ru/cookie-policy/.']
          }
        ]
      }
    ]
  };

  private enContent: Content = {
    title: 'Cookie Policy',
    subtitle:'Revision 1 of 22.04.2026',
    sections: [
      {
        title: '1. General Provisions',
        subsections: [
          {
            title: '',
            content: ['1.1. This Cookie Policy (hereinafter - "Policy") determines what types of cookies the Valestor service (hereinafter - "Site", "Operator") uses, for what purpose, for how long, to whom the data is transmitted, and what rights the user has regarding cookie management.']
          },
          {
            title: '',
            content: ['1.2. Cookies are small text files stored on a user\'s device (computer, smartphone, tablet) when visiting the Site. They allow the Site to recognize the user\'s device, remember settings and actions, collect statistics, and provide additional functionality.']
          },
          {
            title: '',
            content: ['1.3. By using the Site, the user agrees to use cookies in accordance with this Policy, unless otherwise configured in their browser.']
          }
        ]
      },
      {
        title: '2. Types of Cookies and Their Purpose',
        subsections: [
          {
            title: '2.1 Necessary (Technical) Cookies',
            content: ['These cookies are strictly necessary for the Site to function. They provide navigation, page loading, access to protected sections, and remember selected language or region. Without them, the Site cannot function properly. Consent for necessary cookies is not legally required, but the Operator informs the user of their presence.'],
            table: {
              headers: ['Cookie Name', 'Storage Duration', 'Description'],
              rows: [
                ['session_id', 'Until browser closes', 'User session identification'],
                ['csrf_token', 'Until browser closes', 'Protection against cross-site attacks'],
                ['language', '2 years', 'Remembering the selected interface language'],
                ['cookie_consent', '2 years', 'Storing user consent for optional cookies']
              ]
            }
          },
          {
            title: '2.2 Statistical (Analytical) Cookies',
            content: ['These cookies allow the Site to collect information about how visitors use the Site: which pages they open, how long they stay, where they come from, and whether they encounter errors. Data is used to improve the Site and user experience. All data is collected in anonymized form and does not directly identify individuals, but may be considered personal data in combination with other data.'],
            table: {
              headers: ['Cookie Name', 'Storage Duration', 'Provider', 'Description'],
              rows: [
                ['_ga', '2 years', 'Google Analytics', 'Distinguishing unique users'],
                ['_gid', '2 years', 'Google Analytics', 'Distinguishing unique users'],
                ['_gat', '2 years', 'Google Analytics', 'Limiting request frequency'],
                ['_ym_uid', '2 years', 'Yandex.Metrica', 'Unique visitor identifier'],
                ['_ym_d', '2 years', 'Yandex.Metrica', 'Date of first visit'],
                ['_ym_isad', '2 years', 'Yandex.Metrica', 'Ad blocking verification'],
                ['_ym_visorc', '2 years', 'Yandex.Metrica', 'For Web Analytics (action recording)']
              ]
            }
          },
          {
            title: '2.3 Marketing (Advertising) Cookies',
            content: ['These cookies are used to show relevant advertising, including on other sites, limit the number of times an ad is shown, and evaluate the effectiveness of advertising campaigns. They are set by advertising partners of the Site.'],
            table: {
              headers: ['Cookie Name', 'Storage Duration', 'Provider', 'Description'],
              rows: [
                ['_gcl_au', '2 years', 'Google Ads', 'Conversion tracking and retargeting'],
                ['_ym_uid', '2 years', 'Yandex.Metrica', 'Conversion tracking and retargeting']
              ]
            }
          }
        ]
      },
      {
        title: '3. Data Processing Objectives',
        subsections: [
          {
            title: 'The Site uses data obtained through cookies for the following purposes:',
            content: [''],
            table: {
              headers: ['Cookie Type', 'Processing Purposes'],
              rows: [
                ['Necessary (Technical)', 'Ensuring correct Site functionality, security, remembering user settings.'],
                ['Statistical (Analytical)', 'Collecting visitor statistics, analyzing user behavior (funnels, heat maps), identifying errors, improving Site interface and functionality.'],
                ['Marketing (Advertising)', 'Showing personalized advertising, limiting ad frequency, measuring advertising campaign effectiveness, retargeting.']
              ]
            }
          }
        ]
      },
      {
        title: '4. List of Recipients (Third Parties)',
        subsections: [
          {
            title: 'Data collected through cookies may be transmitted to the following third parties:',
            content: [''],
            table: {
              headers: ['Recipient', 'Country', 'Type of Data Transmitted', 'Purpose'],
              rows: [
                ['LLC "Yandex" (Yandex.Metrica)', 'Russia', 'Statistical cookies, anonymized IP address, site action data', 'Analytics, web analytics'],
                ['Google LLC (Google Analytics, Google Ads)', 'USA', 'Statistical and marketing cookies, IP address', 'Analytics, advertising']
              ]
            }
          }
        ]
      },
      {
        title: '5. Cross-Border Data Transfer',
        subsections: [
          {
            title: '',
            content: ['5.1. Use of Google LLC services (Google Analytics, Google Ads) involves transmitting cookie data to servers located in the United States of America.']
          },
          {
            title: '',
            content: ['5.2. The legislation of the Russian Federation does not recognize the USA as a country providing an adequate level of protection for the rights of personal data subjects.']
          },
          {
            title: '',
            content: ['5.3. Before cross-border data transfer, the Site requests explicit user consent through a cookie banner. Users can refuse data transfer to the USA by manually configuring cookies through browser settings and disabling cookie usage.']
          },
          {
            title: '',
            content: ['5.4. The user is notified that data transfer to the USA may involve access by US government authorities in accordance with local legislation. The Operator is not responsible for the actions of foreign authorities but takes measures to minimize transmitted data.']
          }
        ]
      },
      {
        title: '6. Cookie Storage Duration',
        subsections: [
          {
            title: '',
            content: ['6.1. Cookie storage durations are specified in Section 2 of this Policy.']
          },
          {
            title: '6.2 General Principles:',
            content: [
              ' - session cookies are deleted after closing the browser;',
              ' - persistent cookies are stored on the device until the specified period expires or until deleted by the user.'
            ]
          },
          {
            title: '',
            content: ['6.3. After the storage period expires, cookies are automatically deleted by the browser.']
          }
        ]
      },
      {
        title: '7. Cookie Management and User Rights',
        subsections: [
          {
            title: '',
            content: ['7.1. Upon first visiting the Site, users see a cookie banner. By clicking "Understood", the user consents to the use of cookies.']
          },
          {
            title: '',
            content: ['7.2. Users can completely disable or delete cookies through their browser settings.']
          },
          {
            title: '',
            content: ['7.3. Disabling all cookies, including necessary ones, may make the Site inaccessible or significantly limit its functionality.']
          },
          {
            title: '7.4 Rights of Personal Data Subjects:',
            content: ['Since cookie data in some cases constitutes personal data, users have the right to:']
          },
          {
            title: '',
            content: [
              ' - withdraw consent for processing;',
              ' - request information about which cookies and to whom they were transmitted;',
              ' - require deletion of collected data, except that necessary for Site operation;',
              ' - file a complaint with Roskomnadzor.'
            ]
          },
          {
            title: '',
            content: ['7.5. For exercising rights not related to browser, device settings, or banner, users must contact the Site Operator.']
          }
        ]
      },
      {
        title: '8. Final Provisions',
        subsections: [
          {
            title: '',
            content: ['8.1. Users can contact the Operator regarding any questions about cookie usage at hello@valestor.com.']
          },
          {
            title: '',
            content: ['8.2. The Operator may periodically update this Policy as needed. The new version comes into effect upon publication on the Site.']
          },
          {
            title: '',
            content: ['8.3. The current version of the Policy is available on the Site at https://valestor.com/ru/politika-ispolzovaniya-fajlov-cookie/.']
          }
        ]
      }
    ]
  };

  constructor(
    private browserStorageService: BrowserStorageService, 
    private titleService: Title, 
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    const lang = this.browserStorageService.getItem('language');
    this.currentLanguage = lang === 'ru' ? 'ru' : 'en';
    this.content = this.currentLanguage === 'ru' ? this.ruContent : this.enContent;
    console.log('[CookiePolicyComponent] Language:', this.currentLanguage);
    if (this.currentLanguage === 'ru'){
      this.titleService.setTitle(`Валестор - Политика использования файлов cookie`);
      this.metaService.updateTag({
        name: 'description',
        content: 'Политика использования файлов cookie'
      });
    }else{
      this.titleService.setTitle(`Valestor - Cookie Policy`);
      this.metaService.updateTag({
        name: 'description',
        content: 'Cookie Policy'
      });
    }
}

  // Helper method for template
  typeof(value: any): string {
    return typeof value;
  }
}
