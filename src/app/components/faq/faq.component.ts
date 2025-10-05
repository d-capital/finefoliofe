import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface FAQ {
  q: string;
  a: string;
  open?: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  title = "";
  faqs: FAQ[] = [];

  ngOnInit(): void {
    const lang = localStorage.getItem("language");
    if (lang === "ru") {
      this.title = "Часто задаваемые вопросы";
      this.faqs = [
        {
          q: "Что такое стоимостное инвестирование?",
          a: "Стоимостное инвестирование (value investing) – это стратегия, при которой инвестор покупает акции публичных компаний, которые кажутся недооцененными рынком по сравнению с их внутренней или справедливой стоимостью. Цель состоит в том, чтобы заработать на разнице между низкой ценой покупки и последующим ростом цены до справедливого уровня. Основоположники этой стратегии – Бенджамин Грэм и Дэвид Додд. Известные сторонники - Уоррен Баффет, Чарли Мангер, Питер Линч, Джон Темплтон, Дэвид Дреман, Дэниэл Лоэб, Сет Кларман<h3>Ключевые принципы стоимостного инвестирования:</h3><b>Поиск недооцененных активов</b><br>Инвесторы ищут компании, чьи акции торгуются ниже их внутренней стоимости<br><b>Фундаментальный анализ</b><br>Для определения внутренней стоимости используются фундаментальные показатели компании, такие как финансовая отчетность, прибыльность, активы и дивиденды<br><b>«Запас прочности»</b><br>Покупка акций ниже их внутренней стоимости создает «запас прочности», который защищает инвестора от возможных рисков и ухудшения ситуации<br><b>Долгосрочный горизонт</b><br>Это, как правило, долгосрочная стратегия, где инвесторы готовы держать акции, игнорируя краткосрочные колебания рынка<br>"
        },
        {
          q: "Что такое модель инвестирования Питера Линча?",
          a: "<h3>Ключевые принципы метода Питера Линча:</h3><p><strong>Инвестируйте в то, что вы знаете</strong></p><p><span >Это самый известный принцип Линча. Он не означает, что нужно покупать акции только компаний, чью продукцию вы используете. Речь идет о том, чтобы использовать свои знания как отправную точку для дальнейшего исследования</span></p><strong>\"Разберитесь, во что вы вкладываете\"</strong><p><span >Линч считал, что не все акции одинаковы, и для каждой категории нужен свой подход. Он выделял шесть основных типов: медленно растущие компании (Slow Growers), умеренно растущие компании (Stalwarts), быстрорастущие компании (Fast Growers), циклические компании (Cyclicals), компании, выходящие из кризиса (Turnarounds), компании со скрытыми активами (Asset Plays)</span></p><p><strong>Фундаментальный анализ</strong></p><p><span >Линч был дотошным исследователем. Он призывал изучать не графики, а финансовые отчеты компаний. Вот на что он смотрел в первую очередь:</span></p><p><span><b>Цена/Прибыль (P/E)</b></span></p><p><span>Должно быть разумным и, в идеале, ниже или на уровне темпов роста компании</span></p><p><span><b>PEG</b></span></p><p><span>Любимый показатель Линча. Рассчитывается как P/E / Growth Rate. PEG &lt; 1 считается привлекательным</span></p><p><span><b>Долг (D/E)</b></span></p><p><span>Компания с минимальным долгом или без него более устойчива в кризис. Линч избегал компаний с высоким уровнем долга</span></p><p><span><b>Прибыль</b></span></p><p><span>Поиск компаний с устойчивой и растущей прибылью &mdash; ключ к успеху</span></p><p><span><b>Чистые денежные средства на акцию (Net Cash per Share)</b></span></p><p><span >Показывает финансовую стабильность компании</span></p><p><strong>Поиск &laquo;Десятикратников&raquo; (Tenbaggers)</strong></p><p><span >Так Линч называл акции, которые выросли в 10 и более раз. Он считал, что секрет большого успеха &mdash; найти несколько таких \"звезд\" и держать их долго</span></p><p><strong>Долгосрочная перспектива</strong></p><p><span >Не пытайтесь угадать краткосрочные колебания рынка. Линч говорил: &laquo;Больше денег было потеряно из-за попыток предсказать коррекции, чем из-за самих коррекций&raquo;</span></p><p><span >Что такое инвестиции в акции роста по разумной цене (GARP) по Питеру Линчу?</span></p><p><span >Рост по разумной цене (Growth At Reasonable Price, GARP) &mdash; это инвестиционная стратегия, популяризированная Питером Линчем, которая объединяет элементы инвестирования в рост и стоимостного инвестирования. Основная цель GARP &mdash; поиск компаний, показывающих стабильно высокий рост прибыли, но при этом торгующихся по разумным, а не завышенным ценам, что достигается с помощью коэффициента PEG (Price/Earnings to Growth).</span></p><p><strong>Суть стратегии GARP:</strong></p><p><strong>Баланс между ростом и стоимостью</strong></p><p><span >GARP стремится найти компании, которые находятся на грани между стремительным ростом и привлекательной стоимостью, избегая крайностей обоих подходов</span></p><p><strong>Поиск компаний с высоким темпом роста прибыли</strong></p><p><span >(иногда выше среднего по рынку), но при этом не переоцененных</span></p><p><strong>Для оценки используется коэффициент PEG</strong></p><p><span >PEG = P/E к годовомq темп роста прибыли. Акции считаются привлекательными, когда коэффициент PEG равен или меньше 1</span></p>"
        },
        {
          q: "Что такое коэффициент PEG?",
          a: "<p>Коэффициент PEG (Price/Earnings to Growth ratio) — это финансовый мультипликатор, изобретенный Питером Линчем, показывающий, насколько акции недооценены или переоценены, с учетом ожидаемого темпа роста прибыли компании на акцию. Он рассчитывается путем деления коэффициента P/E на ожидаемый годовой процент роста прибыли и помогает инвесторам сравнивать акции компаний с разными темпами развития, делая оценку более объективной, чем простое соотношение P/E.</p><h3>Как работает коэффициент PEG:</h3> <p><b>Расчет P/E</b></p> <p>Сначала определяется мультипликатор P/E — отношение текущей цены акции к прибыли на акцию (EPS)</p>   <p><b>Расчет ожидаемого роста</b></p> <p>Далее прогнозируется ожидаемый темп роста прибыли на акцию (например, на 1-3-5 лет)</p> <p><b>Деление</b></p> Коэффициент PEG получается путем деления P/E на этот прогнозируемый темп роста прибыли в процентах <p><b>Интерпретация результатов</b></p> <i>PEG < 1</i> <p>Акции могут быть недооценены относительно своего потенциала роста, что является хорошим знаком для инвестора</p> <i>PEG > 1</i> <p>Акции могут быть переоценены, а их будущий рост уже учтен в текущей цене</p> "
        },
        {
          q: "Как пользоваться сервисом?",
          a: "Ты можешь начать, введя тикер акции, которую хочешь проанализировать."
        },
        {
          q: "Какие методы стоимостного инвестирования доступны?",
          a: "Ты можешь воспользоваться моделью Питера Линча, чтобы найти недооцененные акции для инвестиций"
        },
        {
          q: "Сколько стоит сервис?",
          a: "Использование нашего сервиса может быть бесплатным или с подпиской на определенные функции"
        }
      ];
    } else {
      this.title = "Frequently Asked Questions";
      this.faqs = [
        { q: "What is Value Investing?", a: "Value investing is a strategy in which an investor purchases shares of public companies that are perceived by the market to be undervalued relative to their intrinsic or fair value. The goal is to profit from the difference between the low purchase price and the subsequent price increase to their fair value. The founders of this strategy were Benjamin Graham and David Dodd. Notable Proponents - Warren Buffett, Charlie Munger, Peter Lynch, John Templeton, David Dreman, Daniel Loeb, Seth Klarman<h3>Key Principles of Value Investing:</h3> <b>Finding Undervalued Assets</b><br>Investors look for companies whose shares are trading below their intrinsic value<br><b>Fundamental Analysis</b><br>A company's fundamentals, such as financial statements, profitability, assets, and dividends, are used to determine intrinsic value<br><b>\"Margin of Safety\"</b><br>Buying shares below their intrinsic value creates a \"margin of safety\" that protects the investor from potential risks and downside<br><b>Long-Term Horizon</b><br>This is typically a long-term strategy where investors are willing to hold shares while ignoring short-term market fluctuations<br>" },
        { q: "What is Peter Lynch's investing model?", a: "<h3>Key Principles of Peter Lynch's Method:</h3><p><strong>Invest in What You Know</strong></p><p><span >This is Lynch's most famous principle. It doesn't mean you should only buy stocks of companies whose products you use. It's about using your knowledge as a starting point for further research.</span></p><strong>\"Understand What You're Investing In\"</strong><p><span >Lynch believed that not all stocks are created equal, and that each category requires its own approach. He identified six main types: Slow Growers, Stalwarts, Fast Growers, Cyclicals, Turnarounds, and Asset Plays.</span></p><p><strong>Fundamental Analysis</strong></p><p><span >Lynch was a meticulous researcher. He urged studying not charts, but companies' financial statements. Here's what he looked at first:</span></p><p><span><b>Price / Earnings (P/E)</b></span></p><p><span>Must be reasonable and, ideally, below or at the level of the company's growth rate.</span></p><p><span><b>PEG</b></span></p><p><span>Lynch's favorite metric. Calculated as P/E / Growth Rate. PEG <1 is considered attractive.</span></p><p><span><b>Debt (D/E)</b></span></p><p><span>A company with minimal or no debt is more resilient in a crisis. Lynch avoided companies with high debt levels.</span></p><p><span><b>Earnings</b></span></p><p><span>Finding companies with sustainable and growing earnings is the key to success.</span></p><p><span><b>Net Cash per Share</b></span></p><p><span >Shows the financial stability of the company.</span></p><p><strong>Finding Tenbaggers</strong></p><p><span >This is what Lynch called stocks that have grown 10 times or more. He believed the secret to great success was finding a few such \"stars\" and holding them for a long time.</span></p><p><strong>Long Term Perspective</strong></p><p><span >Don't try to time short-term market movements. Lynch said, \"More money has been lost trying to predict corrections than in the corrections themselves.\"</span></p><p><span >What is Growth At Reasonable Price (GARP) Investing According to Peter Lynch?</span></p><p><span >Growth At Reasonable Price (GARP) is an investment strategy popularized by Peter Lynch that combines elements of growth investing and value investing. The main goal of GARP is Finding companies that show consistently high earnings growth, but are trading at reasonable, not overvalued, prices, which is achieved using the PEG (Price/Earnings to Growth) ratio.</span></p><p><strong>The essence of the GARP strategy:</strong></p><p><strong>Balance between growth and value</strong></p><p><span >GARP seeks to find companies that are on the border between rapid growth and attractive valuation, avoiding the extremes of both approaches</span></p><p><strong>Finding companies with high earnings growth</strong></p><p><span >(sometimes above the market average), but not overvalued</span></p><p><strong>The PEG ratio is used for valuation</strong></p><p><span >PEG = P/E divided by the annual earnings growth rate. Stocks are considered attractive when the PEG ratio is equal to or less than 1</span></p>" },
        { q: "What is the PEG ratio?", a: "<p>The PEG (Price/Earnings to Growth ratio) is a financial multiple invented by Peter Lynch that shows how much a stock is undervalued or overvalued, given the expected growth rate of the company's earnings per share. It is calculated by dividing the P/E ratio by the expected annual percentage growth in earnings and helps investors compare stocks of companies with different growth rates, making valuation more objective than a simple P/E ratio.</p><h3>How the PEG ratio works:</h3> <p><b>Calculating P/E</b></p> <p>First, the P/E multiple is determined - the ratio of the current share price to earnings per share (EPS)</p> <p><b>Calculating expected growth</b></p> <p>Next, the expected growth rate of earnings per share is projected (for example, for 1-3-5 years)</p> <p><b>Division</b></p> The PEG ratio is obtained by dividing the P/E by this projected earnings growth rate as a percentage <p><b>Interpreting the results</b></p> <i>PEG < 1</i> <p>Stocks may be undervalued relative to their growth potential, which is a good sign for Investor</p> <i>PEG > 1</i> <p>The stock may be overvalued, and its future growth is already priced in.</p>" },
        { q: "How to use the service?", a: "You can get started by entering the ticker symbol of the stock you want to analyze." },
        { q: "What value investing methods are available?", a: "You can use Peter Lynch's model to find undervalued stocks to invest in." },
        { q: "How much does the service cost?", a: "Using our service can be free or with a subscription for certain features." }

      ];
    }
  }

  toggle(faq: FAQ) {
    faq.open = !faq.open;
  }
}
