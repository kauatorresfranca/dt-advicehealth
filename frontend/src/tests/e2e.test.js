const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('TaskMaster E2E Tests', () => {
  let driver;

  beforeAll(async () => {
    const options = new chrome.Options();
    options.addArguments('--headless'); // Roda sem abrir janela
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('Deve carregar a página de login', async () => {
    await driver.get('http://localhost:3000/login');
    const title = await driver.getTitle();
    expect(title).toContain('React App');
  }, 30000);

  test('Deve registrar um novo usuário', async () => {
    await driver.get('http://localhost:3000/register');
    
    await driver.findElement(By.css('input[type="text"]')).sendKeys('seleniumuser');
    await driver.findElement(By.css('input[type="email"]')).sendKeys('selenium@test.com');
    await driver.findElement(By.css('input[type="password"]')).sendKeys('selenium123');
    await driver.findElement(By.css('button[type="submit"]')).click();
    
    // Aguarda redirect ou mensagem
    await driver.sleep(2000);
  }, 30000);

  test('Deve fazer login', async () => {
    await driver.get('http://localhost:3000/login');
    
    await driver.findElement(By.css('input[type="email"]')).sendKeys('teste@test.com');
    await driver.findElement(By.css('input[type="password"]')).sendKeys('senha123');
    await driver.findElement(By.css('button[type="submit"]')).click();
    
    // Aguarda dashboard carregar
    await driver.wait(until.urlContains('/dashboard'), 5000);
    const url = await driver.getCurrentUrl();
    expect(url).toContain('/dashboard');
  }, 30000);
});