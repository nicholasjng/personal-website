import os

BASE_URL = "https://www.nicholasjunge.com"
CONTENT_EXTS = [".md"]

def generate_sitemap():
  url_loc_bracket = "\n\t<url>\n\t\t<loc>{0}</loc>\n\t</url>\n"

  with open("public/sitemap.xml", mode="w", encoding="utf-8") as sitemap:
    sitemap.write("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n")
    sitemap.write("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">")
    sitemap.write(url_loc_bracket.format(BASE_URL))

    for _, dirs, _ in os.walk("pages"):
      for section in dirs:
        sitemap.write(url_loc_bracket.format(BASE_URL + "/" + section))

    for root, _, files in os.walk("content"):
      for f in files:
        # split off file extension
        content_uri, ext = os.path.splitext(os.path.join(os.path.split(root)[-1], f))
        if ext in CONTENT_EXTS:
          sitemap.write(url_loc_bracket.format(BASE_URL + "/" + content_uri))
    
    sitemap.write("</urlset>\n")

if __name__ == "__main__":
  generate_sitemap()
