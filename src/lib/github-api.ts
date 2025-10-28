export interface GitHubFile {
  content: string;
  sha: string;
}

export class GitHubAPI {
  private token: string;
  private repo: string;
  private owner: string;

  constructor() {
    this.token = process.env.GITHUB_TOKEN || '';
    const repoPath = process.env.GITHUB_REPO || 'ngawang21/artist-portfolio';
    [this.owner, this.repo] = repoPath.split('/');
  }

  private async request(path: string, options: RequestInit = {}) {
    const url = `https://api.github.com/repos/${this.owner}/${this.repo}/${path}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `token ${this.token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getFile(path: string): Promise<GitHubFile> {
    const data = await this.request(`contents/${path}`);
    return {
      content: Buffer.from(data.content, 'base64').toString('utf-8'),
      sha: data.sha,
    };
  }

  async updateFile(path: string, content: string, message: string, sha?: string) {
    return this.request(`contents/${path}`, {
      method: 'PUT',
      body: JSON.stringify({
        message,
        content: Buffer.from(content).toString('base64'),
        sha,
      }),
    });
  }

  async getInvoiceNumber(): Promise<number> {
    try {
      const file = await this.getFile('data/invoice-counter.json');
      const data = JSON.parse(file.content);
      const newNumber = (data.lastInvoiceNumber || 0) + 1;
      
      // Update the counter
      const newData = {
        lastInvoiceNumber: newNumber,
        lastUpdated: new Date().toISOString(),
      };
      
      await this.updateFile(
        'data/invoice-counter.json',
        JSON.stringify(newData, null, 2),
        `Update invoice counter to ${newNumber}`,
        file.sha
      );
      
      return newNumber;
    } catch (error) {
      console.error('Error getting invoice number:', error);
      throw error;
    }
  }

  async markArtworkAsSold(artworkId: string, artworkTitle: string) {
    try {
      const filePath = `src/content/artworks/${artworkId}.json`;
      const file = await this.getFile(filePath);
      const artwork = JSON.parse(file.content);
      
      // Update sold status
      artwork.sold = true;
      
      await this.updateFile(
        filePath,
        JSON.stringify(artwork, null, 2),
        `Mark as sold: ${artworkTitle}`,
        file.sha
      );
    } catch (error) {
      console.error('Error marking artwork as sold:', error);
      throw error;
    }
  }

  async saveInvoice(invoiceNumber: number, pdfBuffer: Buffer) {
    try {
      const fileName = `Facture${String(invoiceNumber).padStart(3, '0')}.pdf`;
      const filePath = `invoices/${fileName}`;
      
      await this.updateFile(
        filePath,
        pdfBuffer.toString('base64'),
        `Add invoice ${fileName}`,
        undefined
      );
      
      return fileName;
    } catch (error) {
      console.error('Error saving invoice:', error);
      throw error;
    }
  }
}
