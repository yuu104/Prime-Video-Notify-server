from bs4 import BeautifulSoup
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
import sys, json

url = sys.stdin.readline()

options = Options()
options.add_argument('--headless')

def get_video_info(url):
  driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)
  driver.get(url)
  html = driver.page_source.encode('utf-8')
  soup = BeautifulSoup(html, 'html.parser')
  available_button = soup.find('a', class_='_1ovr-S _15Ikr8 _3kM4Lo _14ydqK _2X_Irl _1ITy4O dv-signup-button')
  available = False if available_button is None else True
  leaving_schedule = soup.find('span', class_='_36qUej _1jE1N6')
  is_leaving_soon = False if leaving_schedule is None else True
  return json.dumps({'available': available, 'isLeavingSoon': is_leaving_soon})

print(get_video_info(url))