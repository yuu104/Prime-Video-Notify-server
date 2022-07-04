from bs4 import BeautifulSoup
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
import sys, json

keyword = sys.stdin.readline()

options = Options()
options.add_argument('--headless')

def search_videos(key):
  driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)
  driver.get(f'https://www.amazon.co.jp/s?k={key}&i=instant-video')
  html = driver.page_source.encode('utf-8')
  soup = BeautifulSoup(html, 'html.parser')
  elements = soup.find_all('a', class_='a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal')
  videos = []
  for element in elements:
    data = {'title': element.contents[0].text, 'url': 'https://www.amazon.co.jp' + element.attrs['href']}
    videos.append(data)
  return json.dumps(videos)

print(search_videos(keyword))

