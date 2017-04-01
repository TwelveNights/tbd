from PyQt4.QtGui import QApplication
from PyQt4.QtCore import QUrl, qInstallMsgHandler
from PyQt4.QtWebKit import QWebPage, QWebSettings

# comment this line to show QT warnings/errors:
qInstallMsgHandler(lambda *args: None)

class PageRenderer(QWebPage):
  def __init__(self, cb):
    self.app = QApplication([])

    QWebPage.__init__(self)

    self.mainFrame().loadFinished.connect(self._loadFinished)
    self.cb = cb
    self.settings().setAttribute(QWebSettings.AutoLoadImages, False)

  def crawl(self, url):
    print('Downloading', url)
    self.mainFrame().load(QUrl(url))
    self.app.exec_()

  def _loadFinished(self, result):
    frame = self.mainFrame()
    url = str(frame.url().toString())
    html = frame.toHtml()
    self.cb(url, html)
    self.app.quit()

def scrape(url, html):
    print('Got {0} bytes of HTML'.format(len(html)))
